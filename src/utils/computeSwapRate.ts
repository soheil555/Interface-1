import { parseCurrencyAmount } from './parseCurrencyAmount'

export function computeSwapRate(
  amountIn: string,
  amountOut: string,
  tokenInDecimals: number,
  tokenOutDecimals: number
) {
  const amountInBigNumber = parseCurrencyAmount(amountIn, tokenInDecimals)
  const amountOutBigNumber = parseCurrencyAmount(amountOut, tokenOutDecimals)

  return amountOutBigNumber
    .mul(parseCurrencyAmount('1', tokenInDecimals))
    .div(amountInBigNumber)
}
