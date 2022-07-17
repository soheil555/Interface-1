import useAddresses from "./useAddresses";
import useERC20Contract from "./useERC20Contract";

export default function useAXOContract() {
  const addresses = useAddresses();
  const address = addresses?.tokens["AXO"];

  return useERC20Contract(address);
}
