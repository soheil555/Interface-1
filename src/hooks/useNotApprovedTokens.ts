import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useAddresses from "./useAddresses";

function getNotApprovedTokens() {}

export default function useNotApprovedTokens() {
  const { account, provider } = useWeb3React();
  const addresses = useAddresses();

  const shouldFetch = !!addresses && !!account && !!provider;

  //TODO: check whether the array or the first element of the array should be unique.
  const result = useSWR(
    shouldFetch ? ["NotApprovedTokens"] : null,
    getNotApprovedTokens
  );
}
