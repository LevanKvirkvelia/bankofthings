import { Static, Type } from "@sinclair/typebox";
import Moralis from "moralis/node";
import { Chains } from "../utils";

export const EthProperties = {
  eth_ERC20Balance: {
    filter: Type.Object({
      method: Type.Literal("eth_ERC20Balance"),
      parameters: Type.Object({
        userAddress: Type.Optional(
          Type.Union([Type.Literal(":user_address"), Type.String()])
        ),
        blockId: Type.Optional(
          Type.Union([Type.Literal(":latest"), Type.Number()])
        ),
        contractAddress: Type.String(),
        chain: Chains,
      }),
    }),
    async func(
      {
        contractAddress,
        userAddress,
        blockId,
        chain,
      }: {
        userAddress?: string;
        blockId?: number | ":latest";
        contractAddress: string;
        chain: Static<typeof Chains>;
      },
      extras
    ) {
      const tokens = await Moralis.Web3API.account.getTokenBalances({
        address:
          typeof blockId === "undefined" || userAddress === ":user_address"
            ? extras.user_address
            : userAddress,
        to_block:
          typeof blockId === "undefined" || blockId === ":latest"
            ? undefined
            : blockId,
        chain: chain,
      });
      console.log(tokens);
      const token = tokens.find(
        (tokens) =>
          tokens.token_address.toLowerCase() === contractAddress.toLowerCase()
      );
      console.log(
        "balance",
        Number(token.balance) / 10 ** Number(token.decimals)
      );
      return token ? Number(token.balance) / 10 ** Number(token.decimals) : 0;
    },
  },

  eth_nativeBalance: {
    filter: Type.Object({
      method: Type.Literal("eth_nativeBalance"),
      parameters: Type.Object({
        userAddress: Type.Optional(
          Type.Union([Type.Literal(":user_address"), Type.String()])
        ),
        blockId: Type.Optional(
          Type.Union([Type.Literal(":latest"), Type.Number()])
        ),
        chain: Chains,
      }),
    }),
    async func(
      {
        userAddress,
        blockId,
        chain,
      }: {
        userAddress?: string;
        blockId?: number | ":latest";
        chain: Static<typeof Chains>;
      },
      extras
    ) {
      const { balance } = await Moralis.Web3API.account.getNativeBalance({
        address:
          typeof blockId === "undefined" || userAddress === ":user_address"
            ? extras.user_address
            : userAddress,
        to_block:
          typeof blockId === "undefined" || blockId === ":latest"
            ? undefined
            : blockId,
        chain: chain,
      });

      return Number(balance) / 10 ** Number(18);
    },
  },
  eth_NFTBalance: {
    filter: Type.Object({
      method: Type.Literal("eth_NFTBalance"),
      parameters: Type.Object({
        userAddress: Type.Optional(
          Type.Union([Type.Literal(":user_address"), Type.String()])
        ),
        blockId: Type.Optional(
          Type.Union([Type.Literal(":latest"), Type.Number()])
        ),
        contractAddress: Type.String(),
        chain: Chains,
      }),
    }),
    async func(
      {
        contractAddress,
        userAddress,
        blockId,
        chain,
      }: {
        userAddress?: string;
        blockId?: number | ":latest";
        contractAddress: string;
        chain: Static<typeof Chains>;
      },
      extras
    ) {
      const nftTokens = await Moralis.Web3API.account.getNFTsForContract({
        address:
          typeof blockId === "undefined" || userAddress === ":user_address"
            ? extras.user_address
            : userAddress,
        token_address: contractAddress,
        chain: chain,
      });

      console.log("nft balance", nftTokens.total);
      return nftTokens.total;
    },
  },
};
