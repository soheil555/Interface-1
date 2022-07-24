import useAddresses from "./useAddresses";
import useTokenBalanceByAddress from "./useTokenBalanceByAddress";

export default function useXltBalance() {
  const addresses = useAddresses();
  const xltAddress = addresses?.tokens["Xolotl"];

  return useTokenBalanceByAddress(xltAddress);
}
