import { ethers } from 'ethers'
import useSWR from 'swr'
import { Factory } from '../abis/types'
import useTokenPairs from './useTokenPairs'
import useFactoryContract from './contracts/useFactoryContract'
import { useKeepSWRDataLiveAsBlocksArrive } from './useKeepSWRDataLiveAsBlocksArrive'
import { Pair } from '../types'

function getLiquidityPairs(factory: Factory) {
  return async (_: string, tokenPairs: [string, string][]) => {
    const allPairs: Pair[] = []

    for (const [tokenA, tokenB] of tokenPairs) {
      const pairAddress = await factory.getPair(tokenA, tokenB)
      if (pairAddress !== ethers.constants.AddressZero) {
        allPairs.push({ address: pairAddress, token0: tokenA, token1: tokenB })
      }
    }

    return allPairs
  }
}

export default function useLiquidityPairs() {
  const tokenPairs = useTokenPairs()
  const factory = useFactoryContract()

  const shouldFetch = !!tokenPairs && !!factory

  const result = useSWR(
    shouldFetch ? ['AllPairs', tokenPairs] : null,
    getLiquidityPairs(factory!)
  )

  useKeepSWRDataLiveAsBlocksArrive(result.mutate)

  return result
}
