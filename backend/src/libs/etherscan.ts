import { URLSearchParams } from "url";
import fetch from "node-fetch";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY as string;

export const getABI = async function getABI(address: string) {
  const searchParams = new URLSearchParams({
    module: "contract",
    action: "getabi",
    address,
    apikey: ETHERSCAN_API_KEY,
  });
  const { result } = await fetch(
    `https://api-kovan.etherscan.io/api?${searchParams}`
  ).then((r) => r.json());
  return JSON.parse(result);
};
