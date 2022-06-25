import PoolBox from "./PoolBox";
import type { StaticImageData } from "next/image";
import PoolMintForm from "./PoolMintForm";
import PoolCreatePairForm from "./PoolCreatePairForm";

import smallIcon from "../../../../public/assets/images/small-icon.png";
import PoolAddLiquidity from "./PoolAddLiquidity";

export interface PoolData {
  image: StaticImageData;
  name: string;
  AXOstaked: string;
  usd: number;
  flexibleAPY: string;
  lockedAPY: string;
  totalStaked: string;
}

const Pool = () => {
  const data: PoolData[] = [
    {
      image: smallIcon,
      name: "Stake Axoswap",
      AXOstaked: "0.0",
      usd: 0,
      flexibleAPY: "10.82%",
      lockedAPY: "Up to 231.12%",
      totalStaked: "134,981,587 AXO ",
    },
    {
      image: smallIcon,
      name: "Stake Axoswap",
      AXOstaked: "0.0",
      usd: 10,
      flexibleAPY: "10.82%",
      lockedAPY: "Up to 231.12%",
      totalStaked: "134,981,587 AXO ",
    },
    {
      image: smallIcon,
      name: "Stake Axoswap",
      AXOstaked: "0.0",
      usd: 0,
      flexibleAPY: "10.82%",
      lockedAPY: "Up to 231.12%",
      totalStaked: "134,981,587 AXO ",
    },
    {
      image: smallIcon,
      name: "Stake Axoswap",
      AXOstaked: "0.0",
      usd: 0,
      flexibleAPY: "10.82%",
      lockedAPY: "Up to 231.12%",
      totalStaked: "134,981,587 AXO ",
    },
    {
      image: smallIcon,
      name: "Stake Axoswap",
      AXOstaked: "0.0",
      usd: 0,
      flexibleAPY: "10.82%",
      lockedAPY: "Up to 231.12%",
      totalStaked: "134,981,587 AXO ",
    },
  ];

  return (
    <div className="pool-wrp bg-secondary p-5">
      <PoolAddLiquidity />
      <div style={{ color: "white", display: "flex" }}>
        <PoolMintForm />
        <PoolCreatePairForm />
      </div>
      <br />

      <div style={{ color: "white" }}>
        {data.map((el, i) => {
          return <PoolBox data={el} key={i} isLast={data.length === i + 1} />;
        })}
      </div>
    </div>
  );
};
export default Pool;
