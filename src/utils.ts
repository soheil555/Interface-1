import { BigNumber, ethers } from "ethers";

export function shortenAddress(address: string): string {
  return (
    address.substring(0, 6) + "..." + address.substring(address.length - 4)
  );
}

export function parseBalance(
  balance: BigNumber,
  decimals = 18,
  decimalToDisplay = 6
) {
  return parseFloat(ethers.utils.formatUnits(balance, decimals)).toFixed(
    decimalToDisplay
  );
}

export function parseBalanceToBigNumber(
  balance: string,
  decimals = 18
): BigNumber {
  return ethers.utils.parseUnits(balance, decimals);
}

export function isNumberValid(value: string, decimals = 18) {
  if (value === "") return true;
  const pattern = `^\\d+\\.?\\d{0,${decimals}}$`;
  const reg = new RegExp(pattern, "g");

  return !!reg.exec(value);
}

export function amountWithSlippage(amount: BigNumber, slippage: string) {
  const numerator = 100 - Number(slippage);
  const decimalCounts = countDecimals(numerator);

  return amount
    .mul(numerator * 10 ** decimalCounts)
    .div(100 * 10 ** decimalCounts);
}

export function balanceWithSlippage(
  balance: string,
  slippage: string,
  decimals = 18
) {
  return parseBalance(
    amountWithSlippage(parseBalanceToBigNumber(balance, decimals), slippage),
    decimals
  );
}

export function countDecimals(value: number) {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length;
}

export function calculatePrice(
  amountIn: string,
  amountOut: string,
  tokenInDecimals: number,
  tokenOutDecimals: number
) {
  const amountInBigNumber = parseBalanceToBigNumber(amountIn, tokenInDecimals);
  const amountOutBigNumber = parseBalanceToBigNumber(
    amountOut,
    tokenOutDecimals
  );

  return parseBalance(
    amountOutBigNumber
      .mul(parseBalanceToBigNumber("1", tokenInDecimals))
      .div(amountInBigNumber),
    tokenOutDecimals
  );
}

export function XLtForAXO(
  xltAmount: BigNumber,
  xltTotalSupply: BigNumber,
  axoBalance: BigNumber
) {
  return xltAmount.mul(axoBalance).div(xltTotalSupply);
}

export function AXOForXLT(
  axoAmount: BigNumber,
  xltTotalSupply: BigNumber,
  xltBalance: BigNumber,
  axoBalance: BigNumber
) {
  if (xltBalance.isZero() || axoBalance) return axoAmount;
  return axoAmount.mul(xltTotalSupply).div(axoBalance);
}
