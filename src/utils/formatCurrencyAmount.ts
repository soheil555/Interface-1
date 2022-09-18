import { BigNumber, ethers } from 'ethers'

export function formatCurrencyAmount(
  amount: BigNumber,
  decimals = 18,
  decimalToDisplay = 6
) {
  return parseFloat(ethers.utils.formatUnits(amount, decimals)).toFixed(
    decimalToDisplay
  )
}
