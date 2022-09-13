import ABI from '../../abis/ERC20.json'
import { ERC20 } from '../../abis/types/ERC20'
import { Token } from '../../types'
import useAddresses from '../useAddresses'
import useContract from './useContract'

export default function useTokenContract(token: Token | string | undefined) {
  const addresses = useAddresses()
  const tokenAddress =
    addresses && token
      ? typeof token === 'string'
        ? token
        : addresses.tokens[token.symbol]
      : undefined

  return useContract<ERC20>(tokenAddress, ABI)
}
