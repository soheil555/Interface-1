import { BigNumber, ethers } from 'ethers'
import { Token } from './types'

export function shortenAddress(address: string): string {
  return address.substring(0, 6) + '...' + address.substring(address.length - 4)
}

export function parseBalance(
  balance: BigNumber,
  decimals = 18,
  decimalToDisplay = 6
) {
  return parseFloat(ethers.utils.formatUnits(balance, decimals)).toFixed(
    decimalToDisplay
  )
}

export function parseBalanceToBigNumber(
  balance: string,
  decimals = 18
): BigNumber {
  return ethers.utils.parseUnits(balance, decimals)
}

export function isNumberValid(value: string, decimals = 18) {
  if (value === '') return true
  const pattern = `^\\d+\\.?\\d{0,${decimals}}$`
  const reg = new RegExp(pattern, 'g')

  return !!reg.exec(value)
}

export function amountWithSlippage(amount: BigNumber, slippage: string) {
  const numerator = 100 - Number(slippage)
  const decimalCounts = countDecimals(numerator)

  return amount
    .mul(numerator * 10 ** decimalCounts)
    .div(100 * 10 ** decimalCounts)
}

export function balanceWithSlippage(
  balance: string,
  slippage: string,
  decimals = 18
) {
  return parseBalance(
    amountWithSlippage(parseBalanceToBigNumber(balance, decimals), slippage),
    decimals
  )
}

export function countDecimals(value: number) {
  if (Math.floor(value) === value) return 0
  return value.toString().split('.')[1].length
}

export function calculatePrice(
  amountIn: string,
  amountOut: string,
  tokenInDecimals: number,
  tokenOutDecimals: number
) {
  const amountInBigNumber = parseBalanceToBigNumber(amountIn, tokenInDecimals)
  const amountOutBigNumber = parseBalanceToBigNumber(
    amountOut,
    tokenOutDecimals
  )

  return parseBalance(
    amountOutBigNumber
      .mul(parseBalanceToBigNumber('1', tokenInDecimals))
      .div(amountInBigNumber),
    tokenOutDecimals
  )
}

export function XLtForAXO(
  xltAmount: BigNumber,
  xltTotalSupply: BigNumber,
  axoBalance: BigNumber
) {
  return xltAmount.mul(axoBalance).div(xltTotalSupply)
}

export function AXOForXLT(
  axoAmount: BigNumber,
  xltTotalSupply: BigNumber,
  xltBalance: BigNumber,
  axoBalance: BigNumber
) {
  if (xltBalance.isZero() || axoBalance) return axoAmount
  return axoAmount.mul(xltTotalSupply).div(axoBalance)
}

export function calculateLiquidityRate(
  token1: Token,
  token2: Token,
  reserve1?: BigNumber,
  reserve2?: BigNumber,
  token1Amount?: string,
  token2Amount?: string
) {
  if (!reserve1 || !reserve2) return undefined

  if (!reserve1.isZero())
    return reserve2
      .mul(parseBalanceToBigNumber('1', token1.decimals))
      .div(reserve1)

  if (!token1Amount || !token2Amount) return undefined

  const token1AmountBigNumber = parseBalanceToBigNumber(
    token1Amount,
    token1.decimals
  )
  const token2AmountBigNumber = parseBalanceToBigNumber(
    token2Amount,
    token2.decimals
  )

  return token2AmountBigNumber
    .mul(parseBalanceToBigNumber('1', token1.decimals))
    .div(token1AmountBigNumber)
}
