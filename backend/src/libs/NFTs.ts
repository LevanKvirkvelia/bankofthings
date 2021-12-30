import Moralis from "moralis/node";
import { btoa } from "buffer";
import { create } from "ipfs-http-client";
import fetch from "node-fetch";

import { getABI } from "./etherscan";

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID as string;
const INFURA_PROJECT_SECRET = process.env.INFURA_PROJECT_SECRET as string;

const ipfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization:
      "Basic " + btoa(INFURA_PROJECT_ID + ":" + INFURA_PROJECT_SECRET),
  },
});

const address = process.env.CONTRACT_ADDRESS as string;

export async function fetchTokenNS(tokenId: string) {
  const abi = await getABI(address);
  return Moralis.Web3API.native.runContractFunction({
    address,
    chain: "kovan",
    function_name: "tokenNS",
    // @ts-ignore
    abi,
    params: { tokenId },
  });
}

export type NFT_METADATA = {
  name: string;
  description: string;
  image?: string;
  attributes?: { trait_type: string; value: string | number }[];
};
export async function uploadNFTMetadata(value: NFT_METADATA) {
  const file = JSON.stringify(value);
  const result = await ipfsClient.add(file);
  return result.cid.toV1().toString();
}

export async function fetchTokenMetadata(tokenId: string) {
  const token = await Moralis.Web3API.token.getTokenIdMetadata({
    address,
    chain: "kovan",
    token_id: tokenId,
  });
  const metadata: NFT_METADATA = await fetch(
    `https://${token.token_uri}.ipfs.infura-ipfs.io/`
  ).then((r) => r.json());
  return { ...token, metadata };
}
