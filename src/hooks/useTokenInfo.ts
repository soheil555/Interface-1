import useAddresses from "./useAddresses";
import { tokens } from "../tokens";

export default function useTokenInfo(tokenAddress: string) {
  const addresses = useAddresses();
  if (!addresses) return undefined;

  const result = Object.entries(addresses.tokens).find(
    ([_, address]) => address === tokenAddress
  );

  if (!result) return undefined;
  const token = tokens.find((token) => token.symbol === result[0]);
  return token;
}
