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
