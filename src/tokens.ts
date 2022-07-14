import {
  Eth,
  Matic,
  Usdc,
  Usdt,
  Dai,
  Algo,
} from "@chakra-icons/cryptocurrency-icons";
import { Token } from "./types";
import { AXOToken } from "./icons";

export const tokens: Array<Token> = [
  {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
    logo: Eth,
  },
  {
    name: "Polygon Matic",
    symbol: "MATIC",
    decimals: 18,
    logo: Matic,
  },
  {
    name: "USDC",
    symbol: "USDC",
    decimals: 18,
    logo: Usdc,
  },
  {
    name: "USDT",
    symbol: "USDT",
    decimals: 18,
    logo: Usdt,
  },
  {
    name: "DAI",
    symbol: "DAI",
    decimals: 18,
    logo: Dai,
  },
  {
    name: "wAlgo",
    symbol: "wALGO",
    decimals: 18,
    logo: Algo,
  },
  {
    name: "Axoswap Token",
    symbol: "AXO",
    decimals: 18,
    logo: AXOToken,
  },
];
