import useSWR from 'swr'
import { Pair } from '../abis/types'
import { Token } from '../types'
import { useKeepSWRDataLiveAsBlocksArrive } from './useKeepSWRDataLiveAsBlocksArrive'
import usePairContract from './contracts/usePairContract'
import useTokenPairAddresses from './useTokenPairAddresses'
import { BigNumber } from 'ethers'

async function getLiquidityPairReserves(
  _: string,
  pairContract: Pair | null,
  token1Address: string,
  token2Address: string
) {
  if (!pairContract)
    return {
      reserve1: BigNumber.from(0),
      reserve2: BigNumber.from(0),
    }

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

export default function useLiquidityPairReserves(
  token1?: Token,
  token2?: Token
) {
  const { token1Address, token2Address } = useTokenPairAddresses(token1, token2)
  const pairContract = usePairContract(token1, token2)

  const shouldFetch = !!token1Address && !!token2Address

  const result = useSWR(
    shouldFetch
      ? ['PairReserves', pairContract, token1Address, token2Address]
      : null,
    getLiquidityPairReserves
  )

  useKeepSWRDataLiveAsBlocksArrive(result.mutate)
  return result
}
