import { useWeb3React } from '@web3-react/core'
import useSWR from 'swr'
import { ERC20 } from '../abis/types'
import { Token } from '../types'
import { useKeepSWRDataLiveAsBlocksArrive } from './useKeepSWRDataLiveAsBlocksArrive'
import useTokenContract from './contracts/useTokenContract'

function getTokenBalance(contract: ERC20) {
  return async (_: string, account: string) => {
    return await contract.balanceOf(account)
  }
}

export default function useTokenBalance(token: Token | string | undefined) {
  const { account } = useWeb3React()
  const contract = useTokenContract(token)

  const shouldFetch = !!contract && !!account && token
  const tokenAddress = typeof token === 'string' ? token : token?.symbol

  const result = useSWR(
    shouldFetch ? ['TokenBalance' + tokenAddress, token, account] : null,
    getTokenBalance(contract!)
  )

  useKeepSWRDataLiveAsBlocksArrive(result.mutate)
  return result
}
