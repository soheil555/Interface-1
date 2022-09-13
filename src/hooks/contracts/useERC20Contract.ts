import { ERC20 } from '../../abis/types'
import useContract from './useContract'
import ABI from '../../abis/ERC20.json'

export default function useERC20Contract(address?: string) {
  return useContract<ERC20>(address, ABI)
}
