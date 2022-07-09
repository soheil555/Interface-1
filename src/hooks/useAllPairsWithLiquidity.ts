import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "ethers";
import useSWR from "swr";
import useAllPairs from "./useAllPairs";
import PairABI from "../abis/Pair.json";
import ERC20ABI from "../abis/ERC20.json";
import { Pair } from "../abis/types/Pair";
import { ERC20 } from "../abis/types";
import { useKeepSWRDataLiveAsBlocksArrive } from "./useKeepSWRDataLiveAsBlocksArrive";
import { Liquidity } from "../types";

function getAllPairsWithLiquidity(provider: Web3Provider) {
  return async (
    _: string,
    allPairs: { address: string; token0: string; token1: string }[],
    account: string
  ) => {
    const pairsWithLiquidity: Liquidity[] = [];

    for (const pair of allPairs) {
      const pairContract = new Contract(
        pair.address,
        PairABI,
        provider
      ) as Pair;
      const token0Contract = new Contract(
        pair.token0,
        ERC20ABI,
        provider
      ) as ERC20;
      const token1Contract = new Contract(
        pair.token1,
        ERC20ABI,
        provider
      ) as ERC20;
      const token0Balance = await token0Contract.balanceOf(pair.address);
      const token1Balance = await token1Contract.balanceOf(pair.address);
      const liquidityBalance = await pairContract.balanceOf(account);
      const totalLiquiditySupply = await pairContract.totalSupply();

      const amount0 = liquidityBalance
        .mul(token0Balance)
        .div(totalLiquiditySupply);
      const amount1 = liquidityBalance
        .mul(token1Balance)
        .div(totalLiquiditySupply);

      if (liquidityBalance.gt(0)) {
        pairsWithLiquidity.push({
          address: pair.address,
          token0: pair.token0,
          token1: pair.token1,
          liquidityBalance,
          amount0,
          amount1,
        });
      }
    }

    return pairsWithLiquidity;
  };
}

export default function useAllPairsWithLiquidity(account?: string) {
  const { data: allPairs } = useAllPairs();
  const { provider } = useWeb3React();

  const shouldFetch = !!account && !!allPairs && !!provider;

  const result = useSWR(
    shouldFetch ? ["AllPairsWithLiquidity", allPairs, account] : null,
    getAllPairsWithLiquidity(provider!),
    {}
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
