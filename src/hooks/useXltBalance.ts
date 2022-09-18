import useAddresses from './useAddresses'
import useTokenBalance from './useTokenBalance'

export default function useXltBalance() {
  const addresses = useAddresses()
  const xltAddress = addresses?.tokens['Xolotl']

  return useTokenBalance(xltAddress)
}
