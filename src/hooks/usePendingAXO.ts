import { useWeb3React } from '@web3-react/core'
import useSWR from 'swr'
import { MasterChef } from '../abis/types'
import { useKeepSWRDataLiveAsBlocksArrive } from './useKeepSWRDataLiveAsBlocksArrive'
import useMasterChefContract from './contracts/useMasterChefContract'

function getPendingAXO(masterChefContract: MasterChef) {
  return async (_: string, pid: number, account: string) => {
    return await masterChefContract.pendingAXO(pid, account)
  }
}

export default function usePendingAXO(pid: number) {
  const masterChefContract = useMasterChefContract()
  const { account } = useWeb3React()

  const shouldFetch = !!masterChefContract && !!account

  const result = useSWR(
    shouldFetch ? ['PendingAXO' + account, pid, account] : null,
    getPendingAXO(masterChefContract!),
    {}
  )

  useKeepSWRDataLiveAsBlocksArrive(result.mutate)
  return result
}
