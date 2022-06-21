import StakingPoolBox from "./StakingPoolBox";
import type { StaticImageData } from "next/image";

import smallIcon from "../../../public/assets/images/small-icon.png";
import StakingWithdrawForm from "./StakingWithdrawForm";

export interface StakingData {
  image: StaticImageData;
  name: string;
  earned: string;
  APR: string;
  liquidity: string;
  multiplier: string;
}

const Staking = () => {
  const data: StakingData[] = [
    {
      image: smallIcon,
      name: " AXO BNB",
      earned: "0.0",
      APR: "10.2%",
      liquidity: "$240,589,381",
      multiplier: "40x",
    },
    {
      image: smallIcon,
      name: " AXO BNB",
      earned: "0.0",
      APR: "10.2%",
      liquidity: "$240,589,381",
      multiplier: "40x",
    },
    {
      image: smallIcon,
      name: " AXO BNB",
      earned: "0.0",
      APR: "10.2%",
      liquidity: "$240,589,381",
      multiplier: "40x",
    },
  ];

  return (
    <div className="pool-wrp bg-secondary p-5">
      <div className="col d-flex justify-content-center">
        <StakingWithdrawForm />
      </div>

      {data.map((el, i) => {
        return (
          <StakingPoolBox key={i} data={el} isLast={data.length === i + 1} />
        );
      })}
    </div>
  );
};
export default Staking;
