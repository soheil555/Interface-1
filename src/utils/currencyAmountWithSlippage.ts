import { BigNumber } from 'ethers'

export function currencyAmountWithSlippage(
  amount: BigNumber,
  slippage: string
) {
  const numerator = 100 - Number(slippage)
  const decimalCounts = countDecimals(numerator)

  return amount
    .mul(numerator * 10 ** decimalCounts)
    .div(100 * 10 ** decimalCounts)
}

export function countDecimals(value: number) {
  if (Math.floor(value) === value) return 0
  return value.toString().split('.')[1].length
}
