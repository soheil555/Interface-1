import { BigNumber } from 'ethers'
import { Token } from '../types'
import { parseCurrencyAmount } from './parseCurrencyAmount'

export function computeLiquidityRate(
  token1: Token,
  token2: Token,
  reserve1?: BigNumber,
  reserve2?: BigNumber,
  token1Amount?: string,
  token2Amount?: string
) {
  if (!reserve1 || !reserve2) return undefined

  if (!reserve1.isZero())
    return reserve2.mul(parseCurrencyAmount('1', token1.decimals)).div(reserve1)

  if (!token1Amount || !token2Amount) return undefined

  const token1AmountBigNumber = parseCurrencyAmount(
    token1Amount,
    token1.decimals
  )
  const token2AmountBigNumber = parseCurrencyAmount(
    token2Amount,
    token2.decimals
  )

  if (token1AmountBigNumber.isZero()) return undefined

  return token2AmountBigNumber
    .mul(parseCurrencyAmount('1', token1.decimals))
    .div(token1AmountBigNumber)
}
