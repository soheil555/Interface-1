import useAddresses from "./useAddresses";
import { tokens } from "../tokens";

export default function useTokenInfo(tokenAddress: string | undefined) {
  const addresses = useAddresses();
  if (!addresses || !tokenAddress) return undefined;

  const result = Object.entries(addresses.tokens).find(
    ([_, address]) => address === tokenAddress
  );

  if (!result) return undefined;
  const token = tokens.find((token) => token.symbol === result[0]);
  return token;
}
