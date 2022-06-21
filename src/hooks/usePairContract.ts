import { UniswapV2Pair } from "../abis/types";
import ABI from "../abis/UniswapV2Pair.json";
import useContract from "./useContract";

export default function usePairContract() {
  return useContract<UniswapV2Pair>(
    "0x663f1cDBa2a04d8f2ec740BF7bbCfde96Ea01288",
    ABI.abi
  );
}
