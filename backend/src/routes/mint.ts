import dkim, { VerifyResult } from "dkim";
import { simpleParser } from "mailparser";
import { isDomainOwner } from "../libs/namecheap/isDomainOwner";
import { app } from "../app";
import { mongoDB } from "../libs/mongo";
import { mintToken, uploadNFTMetadata } from "../libs/NFTs";

const NEW_LINE = /\r?\n/;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string;

const domainsCollection = mongoDB.collection<{
  domain: string;
  isBank: boolean;
  lastTransfer: Date;
  lastOwner: string;
  lastNftTX?: string;
  lastNftContractAddress: string;
  __v: string;
}>("domain");

domainsCollection.createIndex({ domain: 1 }, { unique: true });

function dkimVerify(email: string): Promise<VerifyResult[]> {
  const emailWithNormalizedNewLine = email.includes("\r\n")
    ? email
    : email.replace(/\n/g, "\r\n");
  return new Promise((resolve, reject) => {
    dkim.verify(
      Buffer.from(emailWithNormalizedNewLine, "utf-8"),
      (error, result) => {
        if (error) reject(error);
        else resolve(result as unknown as VerifyResult[]);
      }
    );
  });
}

app.post("/mint", async (req, res) => {
  const to = req.body.to;
  const email = await simpleParser(req.body.email);
  const isFromNamecheap =
    email.from.value[0].address === "support@namecheap.com";
  const includesLogin = email.text.includes("Push to Login ID:  inkout");
  const domain = email.text
    .split("These changes apply to the following domain(s):")[1]
    .trim()
    .split(NEW_LINE)[0]
    .trim()
    .toLowerCase();
  const isDomainExists = await isDomainOwner(domain);
  const dkimResult = await dkimVerify(req.body.email);
  const isAllVerified = !dkimResult.find((i) => !i.verified);
  const dkimHasNamecheap = !!dkimResult.find(
    (i) => i.verified && (i.signature as any).domain === "namecheap.com"
  );

  if (
    !isFromNamecheap ||
    !isDomainExists ||
    !isAllVerified ||
    !dkimHasNamecheap
  )
    throw new Error("Email check error. Please contact support");

  const ipfsCID = await uploadNFTMetadata({
    name: domain,
    description: domain,
  });

  const currentDomain = await domainsCollection.findOne(
    { domain },
    { projection: { __v: 1, isBank: 1, lastTransfer: 1 } }
  );

  if (currentDomain && currentDomain.isBank)
    throw new Error(
      "This domain is already connected to the platform. Please contact support"
    );

  if (currentDomain.lastTransfer?.getTime() > email.date.getTime())
    throw new Error("Email date check error. Please contact support");

  const protectionId = currentDomain?.__v;
  const newProtectionId = Math.random().toString();

  await domainsCollection.updateOne(
    { domain, isBank: false, __v: protectionId },
    {
      $set: {
        isBank: true,
        lastNftTX: undefined,
        lastNftContractAddress: CONTRACT_ADDRESS,
        lastTransfer: new Date(),
        __v: newProtectionId,
      },
      $setOnInsert: { domain },
    },
    { upsert: true }
  );

  const hash = await mintToken(to, ipfsCID);

  await domainsCollection.updateOne(
    { domain, __v: newProtectionId },
    { $set: { lastNftTX: hash } }
  );

  res.json({ hash });
});
