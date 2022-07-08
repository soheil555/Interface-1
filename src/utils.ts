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

export function parseValue(value: string, decimals = 18) {
  value = value.replace(/[-e]/g, "");
  if (value.length === 0) return "";
  let parsedValue = String(Number(parseFloat(value).toFixed(decimals)));
  if (value[value.length - 1] === ".") parsedValue += ".";
  return parsedValue;
}
