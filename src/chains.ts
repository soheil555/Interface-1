import { IconProps } from "@chakra-ui/react";
import type { AddEthereumChainParameter } from "@web3-react/types";
import { Matic } from "@chakra-icons/cryptocurrency-icons";

const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
};

export interface ChainInformation {
  name: string;
  urls: string[];
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
  logo: (props: IconProps) => JSX.Element;
}

export function getAddChainParameters(
  chainId: number
): AddEthereumChainParameter {
  const chainInformation = CHAINS[chainId];

  return {
    chainId,
    chainName: chainInformation.name,
    nativeCurrency: chainInformation.nativeCurrency,
    rpcUrls: chainInformation.urls,
    blockExplorerUrls: chainInformation.blockExplorerUrls,
  };
}

export const CHAINS: {
  [chainId: number]: ChainInformation;
} = {
  80001: {
    urls: process.env.NEXT_PUBLIC_ALCHEMY_KEY
      ? [
          `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
        ]
      : [],
    name: "Polygon Mumbai",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
    logo: Matic,
  },
  137: {
    urls: process.env.NEXT_PUBLIC_ALCHEMY_KEY
      ? [
          `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
        ]
      : [],
    name: "Polygon Mainnet",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://polygonscan.com"],
    logo: Matic,
  },
};
