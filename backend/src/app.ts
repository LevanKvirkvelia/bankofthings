import express from "express";
import "express-async-errors";
import bodyParser from "body-parser";
import Moralis from "moralis/node";
import { fetchTokenNS } from "./libs/NFTs";

const app = express();
const port = 3000;

app.use(bodyParser.json());

const serverUrl = "https://oam0o2ny6nfp.usemoralis.com:2053/server";
const appId = "t0Nv4m9GahmlrffqRMCCzeWKJdmCzcKrmoUcOpe5";

app.post("/nsupdate", async (req, res) => {
  const { tokenId } = req.body;
  console.log(req.body);
  await Moralis.start({ serverUrl, appId });
  const [tokenNS] = await Promise.all([
    fetchTokenNS(tokenId),
    // fetchTokenMetadata(tokenId),
  ]);
  // await setNameServers(token.metadata.name, tokenNS);
  res.json({ tokenNS });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
