import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import { MasterChef } from "../abis/types";
import { useKeepSWRDataLiveAsBlocksArrive } from "./useKeepSWRDataLiveAsBlocksArrive";
import useMasterChefContract from "./useMasterChefContract";

function getFarmUserInfo(masterChefContract: MasterChef) {
  return async (_: string, pid: number, account: string) => {
    return await masterChefContract.userInfo(pid, account);
  };
}

export default function useFarmUserInfo(pid: number) {
  const masterChefContract = useMasterChefContract();
  const { account } = useWeb3React();

  const shouldFetch = !!account && !!masterChefContract;

  const result = useSWR(
    shouldFetch ? ["FarmUserInfo" + account, pid, account] : null,
    getFarmUserInfo(masterChefContract!),
    {}
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
