import useSWR from 'swr'
import { Xolotl } from '../abis/types'
import { useKeepSWRDataLiveAsBlocksArrive } from './useKeepSWRDataLiveAsBlocksArrive'
import useXolotlContract from './useXolotlContract'

function getXolotTotalSupply(xolotContract: Xolotl) {
  return async () => {
    return await xolotContract.totalSupply()
  }
}

export default function useXolotTotalSupply() {
  const xolotContract = useXolotlContract()

  const shouldFetch = !!xolotContract

  const result = useSWR(
    shouldFetch ? ['XolotlTotalSupply'] : null,
    getXolotTotalSupply(xolotContract!),
    {}
  )

  useKeepSWRDataLiveAsBlocksArrive(result.mutate)

  return result
}
