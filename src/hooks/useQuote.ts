import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { Token } from "../types";
import { parseBalanceToBigNumber } from "../utils";
import usePairReserves from "./usePairReserves";
import useRouterContract from "./useRouterContract";

export default function useQuote(
  token1: Token | undefined,
  token2: Token | undefined,
  amountA: string | undefined
) {
  const [amountB, setAmountB] = useState<BigNumber>();
  const { data: reserves } = usePairReserves(token1, token2);
  const router = useRouterContract();

  useEffect(() => {
    let canceled = false;

    if (
      router &&
      reserves &&
      amountA &&
      reserves.reserve1.gt(0) &&
      reserves.reserve2.gt(0) &&
      token1
    ) {
      (async () => {
        const amountB = await router.quote(
          parseBalanceToBigNumber(amountA, token1.decimals),
          reserves.reserve1,
          reserves.reserve2
        );
        if (!canceled) {
          setAmountB(amountB);
        }
      })();
    }

    return () => {
      canceled = true;
    };
  }, [router, reserves, amountA, token1]);

  return amountB;
}
