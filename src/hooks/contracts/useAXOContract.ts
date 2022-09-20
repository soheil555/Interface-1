import useAddresses from '../useAddresses'
import useTokenContract from './useTokenContract'

export default function useAXOContract() {
  const addresses = useAddresses()
  const address = addresses?.tokens['AXO']

  return useTokenContract(address)
}
