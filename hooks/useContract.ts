import { Contract } from "ethers";
import { useMemo } from "react";
import { metaMaskHooks } from "../connectors/metaMask";

export default function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any
): T | null {
  const { useProvider } = metaMaskHooks;
  const signer = useProvider()?.getSigner();

  return useMemo(() => {
    if (!address || !signer || !ABI) return null;

    try {
      return new Contract(address, ABI, signer);
    } catch (error) {
      console.log("Failed to get contract", error);
      return null;
    }
  }, [address, signer, ABI]) as T;
}
