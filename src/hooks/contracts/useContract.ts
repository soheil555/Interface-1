import { Contract } from 'ethers'
import { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'

export default function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any
): T | null {
  const { account, provider } = useWeb3React()

  return useMemo(() => {
    if (!address || !provider || !ABI || !account) return null

    try {
      return new Contract(address, ABI, provider.getSigner(account))
    } catch (error) {
      console.log('Failed to get contract', error)
      return null
    }
  }, [address, provider, ABI, account]) as T
}
