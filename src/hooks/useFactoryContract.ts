import { Factory } from "../abis/types/Factory";
import ABI from "../abis/Factory.json";
import useContract from "./useContract";
import useAddresses from "./useAddresses";

export default function useFactoryContract() {
  const addresses = useAddresses();
  const address = addresses?.factory;

  return useContract<Factory>(address, ABI);
}
