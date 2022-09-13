import { BigNumber, ethers } from 'ethers'

export function parseCurrencyAmount(amount: string, decimals = 18): BigNumber {
  return ethers.utils.parseUnits(amount, decimals)
}
