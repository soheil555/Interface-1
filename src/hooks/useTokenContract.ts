import ABI from '../abis/ERC20.json'
import { ERC20 } from '../abis/types/ERC20'
import { Token } from '../types'
import useAddresses from './useAddresses'
import useContract from './useContract'

export default function useTokenContract(token: Token | undefined) {
  const addresses = useAddresses()
  const tokenAddress =
    addresses && token ? addresses.tokens[token.symbol] : undefined

  return useContract<ERC20>(tokenAddress, ABI)
}
