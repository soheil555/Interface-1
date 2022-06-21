import { MasterChef } from "../abis/types/MasterChef";
import ABI from "../abis/MasterChef.json";
import useContract from "./useContract";

export default function useMasterChefContract() {
  return useContract<MasterChef>(
    "0x0d6995072186C54AaCea93f112B86C125B6Ee6F3",
    ABI
  );
}
