import { useState } from "react";
import settings from "../../assets/images/settings.svg";
import Pool from "./Pool/Pool";
import Staking from "./staking/staking";
import Swap from "./Swap/Swap";
import Tabs from "./Tabs";
const Tab = () => {
  const [isActive, setIsActive] = useState("SWAP");
  const tabHandler = (e) => {
    console.log(e);
    setIsActive(e);
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
