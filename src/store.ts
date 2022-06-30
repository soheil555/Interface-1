import { Web3ReactHooks } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

interface Web3 {
  account: ReturnType<Web3ReactHooks["useAccount"]>;
  chainId: ReturnType<Web3ReactHooks["useChainId"]>;
  connector: MetaMask | undefined;
}

export const web3 = atomWithReset<Web3>({
  account: undefined,
  chainId: undefined,
  connector: undefined,
});

// export const updateWeb3 = atom(null, (get, set, update: Web3) => {
//   set(web3, { ...get(web3), ...update });
// });
