import { useWeb3React } from '@web3-react/core'
import useSWR from 'swr'
import { Xolotl } from '../abis/types'
import { useKeepSWRDataLiveAsBlocksArrive } from './useKeepSWRDataLiveAsBlocksArrive'
import useXolotlContract from './contracts/useXolotlContract'

function getStakedAXOBalance(xolotlContract: Xolotl) {
  return async (_: string, account: string) => {
    return await xolotlContract.AXOBalance(account)
  }
}

export default function useStakedAXOBalance() {
  const { account } = useWeb3React()
  const xolotlContract = useXolotlContract()

  const shouldFetch = !!xolotlContract && !!account

  const result = useSWR(
    shouldFetch ? ['StakedAXOBalance' + account, account] : null,
    getStakedAXOBalance(xolotlContract!),
    {}
  )

  useKeepSWRDataLiveAsBlocksArrive(result.mutate)

  return result
}
