import useSWR from "swr";
import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useKeepSWRDataLiveAsBlocksArrive } from "./useKeepSWRDataLiveAsBlocksArrive";

function getMaticBalance(provider: Web3Provider) {
  return async (_: string, account: string) => {
    return await provider.getBalance(account);
  };
}

export default function useMaticBalance() {
  const { provider, account } = useWeb3React();

  const shouldFetch = !!provider && !!account;

  const result = useSWR(
    shouldFetch ? ["ETHBalance" + account, account] : null,
    getMaticBalance(provider!),
    {}
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
