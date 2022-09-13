import useSWR from 'swr'
import { MasterChef } from '../abis/types'
import { Farm } from '../types'
import { useKeepSWRDataLiveAsBlocksArrive } from './useKeepSWRDataLiveAsBlocksArrive'
import useMasterChefContract from './contracts/useMasterChefContract'

function getFarms(masterChefContract: MasterChef) {
  return async (_: string, account: string) => {
    const poolLength = await masterChefContract.poolLength()
    const farms: Farm[] = []

    for (let i = 0; i < poolLength.toNumber(); i++) {
      const farm = await masterChefContract.poolInfo(i)

      if (account) {
        const farmUserInfo = await masterChefContract.userInfo(i, account)
        if (!farmUserInfo.amount.isZero()) {
          farms.push({
            pid: i,
            ...farm,
          })
        }
      } else {
        farms.push({
          pid: i,
          ...farm,
        })
      }
    }

    return farms
  }
}

export default function useFarms(account?: string) {
  const masterChefContract = useMasterChefContract()

  const shouldFetch = !!masterChefContract

  const result = useSWR(
    shouldFetch ? ['Farms' + account, account] : null,
    getFarms(masterChefContract!),
    {}
  )

  useKeepSWRDataLiveAsBlocksArrive(result.mutate)
  return result
}
