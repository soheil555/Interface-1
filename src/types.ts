import type { IconProps } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { ERC20 } from "./abis/types";

export interface Token {
  name: string;
  symbol: string;
  decimals: number;
  logo: (props: IconProps) => JSX.Element;
}

export interface LiquidityFormValues {
  token1: Token | undefined;
  token2: Token | undefined;
  token1Contract: ERC20 | null;
  token2Contract: ERC20 | null;
  token1Amount: string | undefined;
  token2Amount: string | undefined;
  token1Balance: BigNumber | undefined;
  token2Balance: BigNumber | undefined;
}

export interface SwapFormValues {
  tokenIn: Token | undefined;
  tokenOut: Token | undefined;
  amountIn: string | undefined;
  amountOut: string | undefined;
  tokenInBalance: BigNumber | undefined;
  tokenInReserve: BigNumber | undefined;
  tokenOutReserve: BigNumber | undefined;
}

export interface RemoveLiquidityFormValues {
  percent: number;
}

export interface SettingsFormValues {
  slippage: string;
  deadline: string;
}

export interface AddLPFormValues {
  allocPoint: string;
  lpToken: string;
  update: boolean;
}

export interface EditAllocPointFormValues {
  allocPoint: string;
  update: boolean;
}

export interface StakeFormValues {
  amount: string;
}

export interface Liquidity {
  address: string;
  token0: string;
  token1: string;
  liquidityBalance: BigNumber;
  amount0: BigNumber;
  amount1: BigNumber;
}

export interface Farm {
  pid: number;
  lpToken: string;
  allocPoint: BigNumber;
  lastRewardBlock: BigNumber;
  accAXOPerShare: BigNumber;
}
