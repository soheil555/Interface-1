import ABI from "../abis/ERC20.json";
import { ERC20 } from "../abis/types/ERC20";
import useContract from "./useContract";

export default function useTokenContract(address: string | undefined) {
  return useContract<ERC20>(address, ABI);
}
