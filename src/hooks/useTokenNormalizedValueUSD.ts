import { BigNumber } from 'ethers'
import { Token } from '../types'
import { parseCurrencyAmount } from '../utils'
import useTokenPriceUSD from './useTokenPriceUSD'

function getNormalizedValueUSD(
  token: Token,
  amount: BigNumber | string,
  priceUSD: BigNumber
) {
  amount =
    amount instanceof BigNumber
      ? amount
      : parseCurrencyAmount(amount, token.decimals)

  const usdDecimals = 6
  const decimalsAdjustment = Math.abs(token.decimals - usdDecimals)

  if (decimalsAdjustment > 0) {
    return amount
      .mul(priceUSD)
      .mul(BigNumber.from(10).pow(decimalsAdjustment))
      .div(BigNumber.from(10).pow(decimalsAdjustment + token.decimals))
  } else {
    return amount.mul(priceUSD).div(BigNumber.from(10).pow(usdDecimals))
  }
}

export default function useTokenNormalizedValueUSD(
  token: Token | undefined,
  amount: BigNumber | string | undefined
) {
  const { data: tokenPriceUSD } = useTokenPriceUSD(token)
  if (
    token &&
    amount &&
    ((typeof amount === 'string' && amount.length) ||
      (amount instanceof BigNumber && !amount.isZero())) > 0 &&
    tokenPriceUSD
  )
    return getNormalizedValueUSD(token, amount, tokenPriceUSD)

  return undefined
}
