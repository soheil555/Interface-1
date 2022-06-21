import { MasterChef } from "../contracts/types/MasterChef";
import ABI from "../contracts/MasterChef.json";
import useContract from "./useContract";

export default function useMasterChefContract() {
  return useContract<MasterChef>(
    "0x0d6995072186C54AaCea93f112B86C125B6Ee6F3",
    ABI
  );
}
