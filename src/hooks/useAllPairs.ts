import { ethers } from "ethers";
import useSWR from "swr";
import { Factory } from "../abis/types";
import useAllTokenPairs from "./useAllTokenPairs";
import useFactoryContract from "./useFactoryContract";
import { useKeepSWRDataLiveAsBlocksArrive } from "./useKeepSWRDataLiveAsBlocksArrive";
import { Pair } from "../types";

function getAllPairs(factory: Factory) {
  return async (_: string, tokenPairs: [string, string][]) => {
    const allPairs: Pair[] = [];

    for (const [tokenA, tokenB] of tokenPairs) {
      const pairAddress = await factory.getPair(tokenA, tokenB);
      if (pairAddress !== ethers.constants.AddressZero) {
        allPairs.push({ address: pairAddress, token0: tokenA, token1: tokenB });
      }
    }

    return allPairs;
  };
}

export default function useAllPairs() {
  const allTokenPairs = useAllTokenPairs();
  const factory = useFactoryContract();

  const shouldFetch = !!allTokenPairs && !!factory;

  const result = useSWR(
    shouldFetch ? ["AllPairs", allTokenPairs] : null,
    getAllPairs(factory!),
    {}
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
