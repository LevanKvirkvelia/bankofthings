import fp from "fastify-plugin";
import { setNameServers } from "../../libs/namecheap/setNameServers";
import { fetchTokenMetadata, fetchTokenNS } from "../../libs/NFTs";

export default fp(async function (fastify, opts) {
  fastify.post<{ Body: { object: { tokenId: string } } }>(
    "/nsupdate",
    async (request) => {
      const { tokenId } = request.body.object;
      const [tokenNS, token] = await Promise.all([
        fetchTokenNS(tokenId),
        fetchTokenMetadata(tokenId),
      ]);
      await setNameServers(token.metadata.name, tokenNS);
      return { tokenNS };
    }
  );
});
