import { useEffect, useState } from 'react'
import useAllPairs from './useAllPairs'

export default function useLiquidityInfo(address: string) {
  const [info, setInfo] = useState<{ token0: string; token1: string }>()
  const { data: liquidityPairs } = useAllPairs()

  useEffect(() => {
    if (liquidityPairs) {
      const liquidity = liquidityPairs.find((pair) => pair.address === address)
      setInfo(
        liquidity && { token0: liquidity.token0, token1: liquidity.token1 }
      )
    }
  }, [liquidityPairs])

  return info
}
