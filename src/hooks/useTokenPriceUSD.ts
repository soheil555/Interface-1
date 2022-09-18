import useSWR from 'swr'
import { AxOracle } from '../abis/types'
import { Token } from '../types'
import useAddresses from './useAddresses'
import useAxOracleContract from './contracts/useAxOracleContract'
import { useKeepSWRDataLiveAsBlocksArrive } from './useKeepSWRDataLiveAsBlocksArrive'

function getTokenPrice(axOracleContract: AxOracle) {
  return (_: string, tokenAddress: string) => {
    return axOracleContract.getPriceUsdcRecommended(tokenAddress)
  }
}

export default function useTokenPriceUSD(token: Token | undefined) {
  const addresses = useAddresses()
  const tokenAddress =
    addresses && token ? addresses.tokens[token.symbol] : undefined
  const axOracleContract = useAxOracleContract()

  const shouldFetch = !!tokenAddress && !!axOracleContract

  const result = useSWR(
    shouldFetch ? ['tokenPrice', tokenAddress] : null,
    getTokenPrice(axOracleContract!)
  )

  useKeepSWRDataLiveAsBlocksArrive(result.mutate)
  return result
}
