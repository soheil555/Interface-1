import useAddresses from './useAddresses'
import useContract from './useContract'
import ABI from '../abis/AxOracle.json'
import { AxOracle } from '../abis/types'

export default function useAxOracleContract() {
  const addresses = useAddresses()
  const address = addresses?.axOracle

  return useContract<AxOracle>(address, ABI)
}
