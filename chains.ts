import type { AddEthereumChainParameter } from "@web3-react/types";

const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
};

interface ChainInformation {
  name: string;
  urls: string[];
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
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
  },
};
