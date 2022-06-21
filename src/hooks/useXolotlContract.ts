import useContract from "./useContract";
import { Xolotl } from "../abis/types/Xolotl";
import ABI from "../abis/Xolotl.json";

export default function useXolotlContract() {
  return useContract<Xolotl>("0x453b3aCf7e968f7ff7859a9eEBD4Cdf4B20924c0", ABI);
}
