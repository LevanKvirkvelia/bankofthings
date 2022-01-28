import { Static, Type } from "@sinclair/typebox";
import Moralis from "moralis/node";
import { Chains } from "../utils";

export const EthProperties = {
  eth_getBalance: {
    filter: Type.Object({
      method: Type.Literal("eth_getBalance"),
      parameters: Type.Object({
        userAddress: Type.Optional(
          Type.Union([Type.Literal("%{user_address}%"), Type.String()])
        ),
        blockId: Type.Optional(
          Type.Union([Type.Literal("%{latest}%"), Type.Number()])
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
        blockId?: number | "%{latest}%";
        contractAddress: string;
        chain: Static<typeof Chains>;
      },
      extras
    ) {
      const tokens = await Moralis.Web3API.account.getTokenBalances({
        address:
          userAddress === "%{user_address}%" || typeof blockId === "undefined"
            ? extras.user_address
            : userAddress,
        to_block:
          typeof blockId === "undefined" || blockId === "%{latest}%"
            ? undefined
            : blockId,
        chain: chain,
      });

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
};
