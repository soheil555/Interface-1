import useAddresses from './useAddresses'
import useTokenBalance from './useTokenBalance'

export default function useUnstakedAXOBalance() {
  const addresses = useAddresses()
  const address = addresses?.tokens.AXO

  return useTokenBalance(address)
}
