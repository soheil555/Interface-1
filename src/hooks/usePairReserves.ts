import useSWR from 'swr'
import { Pair } from '../abis/types'
import { Token } from '../types'
import { useKeepSWRDataLiveAsBlocksArrive } from './useKeepSWRDataLiveAsBlocksArrive'
import usePairContract from './usePairContract'
import useTokenPairAddresses from './useTokenPairAddresses'

function getPairReserves(pairContract: Pair) {
  return async (_: string, token1Address: string, token2Address: string) => {
    const reserves = await pairContract.getReserves()

    if (token1Address < token2Address) {
      return {
        reserve1: reserves._reserve0,
        reserve2: reserves._reserve1,
      }
    }
    return {
      reserve1: reserves._reserve1,
      reserve2: reserves._reserve0,
    }
  }
}

export default function usePairReserves(token1?: Token, token2?: Token) {
  const { token1Address, token2Address } = useTokenPairAddresses(token1, token2)
  const pairContract = usePairContract(token1, token2)

  const shouldFetch = !!pairContract && !!token1Address && !!token2Address

  const result = useSWR(
    shouldFetch
      ? ['PairReserves' + pairContract.address, token1Address, token2Address]
      : null,
    getPairReserves(pairContract!),
    {}
  )

  useKeepSWRDataLiveAsBlocksArrive(result.mutate)
  return result
}
