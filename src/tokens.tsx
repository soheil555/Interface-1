import { Eth, Matic, Usdc, Usdt } from "@chakra-icons/cryptocurrency-icons";
import type { IconProps } from "@chakra-ui/react";

export interface Token {
  name: string;
  symbol: string;
  decimals: number;
  logo: (props: IconProps) => JSX.Element;
}

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
];
