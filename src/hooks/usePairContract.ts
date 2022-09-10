import useContract from './useContract'
import ABI from '../abis/Pair.json'
import { Pair } from '../abis/types/Pair'
import { Token } from '../types'
import useFactoryContract from './useFactoryContract'
import useAddresses from './useAddresses'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

export default function usePairContract(token1?: Token, token2?: Token) {
  const [address, setAddress] = useState<string>()
  const factory = useFactoryContract()
  const addresses = useAddresses()

  useEffect(() => {
    if (addresses && factory && token1 && token2) {
      ;(async () => {
        const pairAddress = await factory.getPair(
          addresses.tokens[token1.symbol],
          addresses.tokens[token2.symbol]
        )

        if (pairAddress !== ethers.constants.AddressZero) {
          setAddress(pairAddress)
        } else {
          setAddress(undefined)
        }
      })()
    }
  }, [addresses, factory, token1, token2])

  return useContract<Pair>(address, ABI)
}
