import Moralis from "moralis/node";
import { btoa } from "buffer";
import { create } from "ipfs-http-client";
import fetch from "node-fetch";
import { ethers, Wallet } from "ethers";

import { getABI } from "./etherscan";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string;
const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY as string;
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID as string;
const INFURA_IPFS_PROJECT_ID = process.env.INFURA_IPFS_PROJECT_ID as string;
const INFURA_IPFS_PROJECT_SECRET = process.env
  .INFURA_IPFS_PROJECT_SECRET as string;

const provider = new ethers.providers.JsonRpcProvider(
  "https://kovan.infura.io/v3/" + INFURA_PROJECT_ID
);
const signer = new Wallet(OWNER_PRIVATE_KEY, provider);

const ipfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization:
      "Basic " +
      btoa(INFURA_IPFS_PROJECT_ID + ":" + INFURA_IPFS_PROJECT_SECRET),
  },
});

export async function fetchTokenNS(tokenId: string) {
  const abi = await getABI(CONTRACT_ADDRESS);
  return Moralis.Web3API.native.runContractFunction({
    address: CONTRACT_ADDRESS,
    chain: "kovan",
    function_name: "tokenNS",
    // @ts-ignore
    abi,
    params: { tokenId },
  });
}

export async function mintToken(address: string, ipfsTokenURI: string) {
  const abi = await getABI(CONTRACT_ADDRESS);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
  const tx = await contract.connect(signer).createW2D(address, ipfsTokenURI);
  return tx.hash;
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
    address: CONTRACT_ADDRESS,
    chain: "kovan",
    token_id: tokenId,
  });
  const metadata: NFT_METADATA = await fetch(
    `https://${token.token_uri}.ipfs.infura-ipfs.io/`
  ).then((r) => r.json());
  return { ...token, metadata };
}
