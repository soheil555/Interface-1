import {
  Eth,
  Matic,
  Usdc,
  Usdt,
  Btc,
} from "@chakra-icons/cryptocurrency-icons";
import { Token } from "./types";

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
    name: "Axoswap Token",
    symbol: "AXO",
    decimals: 18,
    logo: Btc,
  },
];
