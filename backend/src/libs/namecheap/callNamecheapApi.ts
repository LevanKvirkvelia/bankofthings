import { URLSearchParams } from "url";
import fetch from "node-fetch";
import HttpsProxyAgent from "https-proxy-agent";
import { mongoDB } from "../mongo";
import { parseString as cbParseString } from "xml2js";

function parseString(string: string) {
  return new Promise((resolve, reject) =>
    cbParseString(string, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    })
  );
}

const NAMECHEAP_API_KEY = process.env.NAMECHEAP_API_KEY as string;
const PROXY = process.env.PROXY as string;
const PROXY_HOSTNAME = new URL(PROXY).hostname;

const proxyAgent = HttpsProxyAgent(PROXY);

type NameCheapResponses = { params: any; response: string };

const namecheapResponses =
  mongoDB.collection<NameCheapResponses>("namecheapResponses");

export async function callNamecheapApi(params: any) {
  const searchParams = new URLSearchParams({
    ApiKey: NAMECHEAP_API_KEY,
    ClientIp: PROXY_HOSTNAME,
    ApiUser: "InkOut",
    UserName: "InkOut",
    ...params,
  });

  const response = await fetch(
    `https://api.namecheap.com/xml.response?${searchParams.toString()}`,
    { agent: proxyAgent }
  ).then((r) => r.text());

  await namecheapResponses.insertOne({ params, response });

  return parseString(response) as any;
}
