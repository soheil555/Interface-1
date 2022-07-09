import { Token } from "../types";
import useAddresses from "./useAddresses";

export default function useTokenPairAddresses(token1?: Token, token2?: Token) {
  const addresses = useAddresses();

  if (!token1 || !token2 || !addresses)
    return { token1Address: undefined, token2Address: undefined };

  const token1Address = addresses?.tokens[token1?.symbol];
  const token2Address = addresses?.tokens[token2?.symbol];

  return { token1Address, token2Address };
}
