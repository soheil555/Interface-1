import type { NextPage } from "next";

import Footer from "../components/common/Footer";
import HeaderSwap from "../components/common/HeaderSwap";
import Tab from "../components/swap/Tab";

const Swap: NextPage = () => {
  return (
    <>
      <HeaderSwap />
      <Tab />
      <Footer />
    </>
  );
};

export default Swap;
