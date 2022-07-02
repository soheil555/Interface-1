import type { NextPageWithLayout } from "../_app";
import { IoSwapVertical } from "react-icons/io5";
import SelectPair from "../../components/app/SelectPair/SelectTokenPair";
import Layout from "../../components/app/Layout";

const Swap: NextPageWithLayout = () => {
  const handleSwap = () => {};

  return (
    <></>
    // <SelectPair
    //   label1="from"
    //   label2="to"
    //   icon={<IoSwapVertical />}
    //   handle={handleSwap}
    //   action="swap"
    // />
  );
};

Swap.getLayout = Layout;

export default Swap;
