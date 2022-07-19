import { useWeb3React } from "@web3-react/core";
import useAddresses from "./useAddresses";
import useTokenBalanceByAddress from "./useTokenBalanceByAddress";

export default function useUnstakedAXOBalance() {
  const addresses = useAddresses();
  const address = addresses?.tokens.AXO;

  return useTokenBalanceByAddress(address);
}
