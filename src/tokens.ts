import {
  Aave,
  Dai,
  Eth,
  Matic,
  Usdc,
  Usdt,
  Chain,
} from "@chakra-icons/cryptocurrency-icons";
import { Token } from "./types";
import { AXOToken } from "./icons";

export const tokens: Array<Token> = [
  {
    name: "Matic",
    symbol: "MATIC",
    decimals: 18,
    logo: Matic,
    isCoin: true,
  },
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
    name: "AxoSwap",
    symbol: "AXO",
    decimals: 18,
    logo: AXOToken,
  },
  {
    name: "wrapped Ethereum",
    symbol: "wEth",
    decimals: 18,
    logo: Eth,
  },
  {
    decimals: 18,
    logo: Aave,
    name: "Aave",
    symbol: "AAVE",
  },
  {
    decimals: 18,
    logo: Dai,
    name: "Dai Stablecoin",
    symbol: "DAI",
  },
  {
    decimals: 18,
    logo: Chain,
    name: "ChainLink Token",
    symbol: "LINK",
  },
];
