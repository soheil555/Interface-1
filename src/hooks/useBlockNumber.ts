import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";

function getBlockNumber(provider: Web3Provider) {
  return async () => {
    return await provider.getBlockNumber();
  };
}

export default function useBlockNumber() {
  const { provider } = useWeb3React();
  const shouldFetch = !!provider;

  return useSWR(
    shouldFetch ? ["BlockNumber"] : null,
    getBlockNumber(provider!),
    {
      refreshInterval: 10 * 1000,
    }
  );
}
