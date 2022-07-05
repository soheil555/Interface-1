import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import { ERC20 } from "../abis/types";
import useAddresses from "./useAddresses";
import { useKeepSWRDataLiveAsBlocksArrive } from "./useKeepSWRDataLiveAsBlocksArrive";
import useTokenContract from "./useTokenContract";

function getTokenBalance(contract: ERC20) {
  return async (_: string, account: string) => {
    return await contract.balanceOf(account);
  };
}

export default function useTokenBalance(tokenSymbol: string | undefined) {
  const { account } = useWeb3React();
  const addresses = useAddresses();
  const tokenAddress = tokenSymbol ? addresses?.tokens[tokenSymbol] : undefined;
  const contract = useTokenContract(tokenAddress);

  const shouldFetch = !!contract && !!account;

  const result = useSWR(
    shouldFetch ? ["TokenBalance", account] : null,
    getTokenBalance(contract!)
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);
  return result;
}
