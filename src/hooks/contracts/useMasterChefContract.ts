import useAddresses from '../useAddresses'
import useContract from './useContract'
import { MasterChef } from '../../abis/types'
import ABI from '../../abis/MasterChef.json'

export default function useMasterChefContract() {
  const addresses = useAddresses()
  const address = addresses?.masterChef

  return useContract<MasterChef>(address, ABI)
}
