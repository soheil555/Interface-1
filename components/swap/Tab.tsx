import { useState } from "react";
import Pool from "./Pool/Pool";
import Staking from "./staking/Staking";
import Swap from "./Swap/Swap";
import Tabs from "./Tabs";

const Tab = () => {
  const [isActive, setIsActive] = useState("SWAP");
  const tabHandler = (el: string) => {
    console.log(el);
    setIsActive(el);
  };
  return (
    <Tabs isActive={isActive} tabHandler={tabHandler}>
      {isActive === "SWAP" ? (
        <Swap />
      ) : isActive === "POOL" ? (
        <Pool />
      ) : (
        <Staking />
      )}
    </Tabs>
  );
};
export default Tab;
