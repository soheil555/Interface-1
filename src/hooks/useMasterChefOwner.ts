import { useEffect, useState } from 'react'
import useMasterChefContract from './contracts/useMasterChefContract'

export default function useMasterChefOwner() {
  const [owner, setOwner] = useState<string>()
  const masterChefContract = useMasterChefContract()

  useEffect(() => {
    if (masterChefContract) {
      ;(async () => {
        const owner = await masterChefContract.owner()
        setOwner(owner)
      })()
    }
  }, [masterChefContract])

  return owner
}
