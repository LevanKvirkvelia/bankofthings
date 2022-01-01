import { fetchTokenMetadata, fetchTokenNS } from "../libs/NFTs";
import { setNameServers } from "../libs/namecheap/setNameServers";
import { app } from "../app";

app.post("/nsupdate", async (req, res) => {
  const { tokenId } = req.body.object;
  const [tokenNS, token] = await Promise.all([
    fetchTokenNS(tokenId),
    fetchTokenMetadata(tokenId),
  ]);
  await setNameServers(token.metadata.name, tokenNS);
  res.json({ tokenNS });
});
