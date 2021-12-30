import express from "express";
import "express-async-errors";
import bodyParser from "body-parser";
import Moralis from "moralis/node";
import { fetchTokenMetadata, fetchTokenNS } from "./libs/NFTs";
import { setNameServers } from "./libs/namecheap";

const app = express();
const port = 3000;

app.use(bodyParser.json());

const serverUrl = "https://oam0o2ny6nfp.usemoralis.com:2053/server";
const appId = "t0Nv4m9GahmlrffqRMCCzeWKJdmCzcKrmoUcOpe5";

app.post("/nsupdate", async (req, res) => {
  const { tokenId } = req.body.object;
  console.log(req.body);
  await Moralis.start({ serverUrl, appId });
  const [tokenNS, token] = await Promise.all([
    fetchTokenNS(tokenId),
    fetchTokenMetadata(tokenId),
  ]);
  const resp = await setNameServers(token.metadata.name, tokenNS);
  console.log({ namecheap: resp });
  res.json({ tokenNS });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
