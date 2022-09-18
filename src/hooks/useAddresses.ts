import { useWeb3React } from '@web3-react/core'
import { addresses } from '../addresses'

export default function useAddresses() {
  const { chainId } = useWeb3React()
  return chainId ? addresses[chainId] : undefined
}
