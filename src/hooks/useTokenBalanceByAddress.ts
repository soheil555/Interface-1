import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import { ERC20 } from "../abis/types";
import { Token } from "../types";
import { useKeepSWRDataLiveAsBlocksArrive } from "./useKeepSWRDataLiveAsBlocksArrive";
import useTokenContract from "./useTokenContract";
import useERC20Contract from "./useERC20Contract";

function getTokenBalance(contract: ERC20) {
  return async (_: string, account: string) => {
    return await contract.balanceOf(account);
  };
}

export default function useTokenBalanceByAddress(address: string) {
  const { account } = useWeb3React();
  const contract = useERC20Contract(address);

  const shouldFetch = !!contract && !!account;

  const result = useSWR(
    shouldFetch ? ["TokenBalance" + address, account] : null,
    getTokenBalance(contract!)
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);
  return result;
}
