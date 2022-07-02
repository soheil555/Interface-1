import { Eth, Matic, Usdc, Usdt } from "@chakra-icons/cryptocurrency-icons";
import type { IconProps } from "@chakra-ui/react";

export interface Token {
  name: string;
  symbol: string;
  logo: (props: IconProps) => JSX.Element;
}

export const tokens: Array<Token> = [
  {
    name: "Ether",
    symbol: "ETH",
    logo: Eth,
  },
  {
    name: "Polygon Matic",
    symbol: "MATIC",
    logo: Matic,
  },
  {
    name: "USDC",
    symbol: "USDC",
    logo: Usdc,
  },
  {
    name: "USDT",
    symbol: "USDT",
    logo: Usdt,
  },
];
