import useSWR from "swr";
import { MasterChef } from "../abis/types";
import { Farm } from "../types";
import { useKeepSWRDataLiveAsBlocksArrive } from "./useKeepSWRDataLiveAsBlocksArrive";
import useMasterChefContract from "./useMasterChefContract";

function getFarms(masterChefContract: MasterChef) {
  return async () => {
    const poolLength = await masterChefContract.poolLength();
    const farms: Farm[] = [];

    for (let i = 0; i < poolLength.toNumber(); i++) {
      const farm = await masterChefContract.poolInfo(i);
      farms.push({
        pid: i,
        ...farm,
      });
    }

    return farms;
  };
}

export default function useFarms() {
  const masterChefContract = useMasterChefContract();

  const shouldFetch = !!masterChefContract;

  const result = useSWR(
    shouldFetch ? ["Farms"] : null,
    getFarms(masterChefContract!),
    {}
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);
  return result;
}
