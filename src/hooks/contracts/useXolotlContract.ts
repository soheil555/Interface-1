import useAddresses from '../useAddresses'
import useContract from './useContract'
import ABI from '../../abis/Xolotl.json'
import { Xolotl } from '../../abis/types/Xolotl'

export default function useXolotlContract() {
  const addresses = useAddresses()
  const address = addresses?.tokens.Xolotl

  return useContract<Xolotl>(address, ABI)
}
