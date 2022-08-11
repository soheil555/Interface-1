import useAddresses from "./useAddresses";
import useContract from "./useContract";
import { Axofarm } from "../abis/types";
import ABI from "../abis/Axofarm.json";

export default function useAxofarmContract() {
    const addresses = useAddresses();
    const address = addresses?.axofarm;
  
    return useContract<Axofarm>(address, ABI);
  }
  