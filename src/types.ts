import type { IconProps } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { ERC20 } from "./abis/types";

export interface Token {
  name: string;
  symbol: string;
  decimals: number;
  logo: (props: IconProps) => JSX.Element;
}

export interface FormValues {
  token1: Token | undefined;
  token2: Token | undefined;
  token1Contract: ERC20 | null;
  token2Contract: ERC20 | null;
  token1Amount: string | undefined;
  token2Amount: string | undefined;
  token1Balance: BigNumber | undefined;
  token2Balance: BigNumber | undefined;
}
