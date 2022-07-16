import { Dai, Matic, Usdc, Usdt } from "@chakra-icons/cryptocurrency-icons";
import { Token } from "./types";
import { AXOToken } from "./icons";

export const tokens: Array<Token> = [
  {
    name: "wMatic",
    symbol: "wMATIC",
    decimals: 18,
    logo: Matic,
  },
  {
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
    logo: Usdc,
  },
  {
    name: "USDT",
    symbol: "USDT",
    decimals: 6,
    logo: Usdt,
  },
  {
    name: "DAI",
    symbol: "DAI",
    decimals: 6,
    logo: Dai,
  },
  {
    name: "Axoswap Token",
    symbol: "AXO",
    decimals: 18,
    logo: AXOToken,
  },
];
