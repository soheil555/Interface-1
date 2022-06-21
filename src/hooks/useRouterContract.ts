import useContract from "./useContract";
import { Router } from "../abis/types/Router";
import ABI from "../abis/Router.json";

export default function useRouterContract() {
  return useContract<Router>("0x481b6c7208C17FF9d01a77c25D31f66809111772", ABI);
}
