import { UniswapV2Factory } from "../contracts/types/UniswapV2Factory";
import ABI from "../contracts/UniswapV2Factory.json";
import useContract from "./useContract";

export default function useFactoryContract() {
  return useContract<UniswapV2Factory>(
    "0x1495C7B8d37E2b7624c60Cb28475E1B59d93919e",
    ABI.abi
  );
}
