import { BigNumber, ethers } from 'ethers'

export function parseCurrencyAmount(amount: string, decimals = 18): BigNumber {
  amount = amount === '' ? '0' : amount
  return ethers.utils.parseUnits(amount, decimals)
}
