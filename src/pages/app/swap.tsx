import type { NextPageWithLayout } from "../_app";
import { type ReactElement } from "react";
import { Container } from "@chakra-ui/react";
import AppHeader from "../../components/common/Header/AppHeader";
import Tabs from "../../components/app/Tabs";
import { IoSwapVertical } from "react-icons/io5";
import SelectPair from "../../components/app/SelectPair/SelectPair";

const Swap: NextPageWithLayout = () => {
  const handleSwap = () => {};

  return (
    <SelectPair
      label1="from"
      label2="to"
      icon={<IoSwapVertical />}
      handle={handleSwap}
      action="swap"
    />
  );
};

Swap.getLayout = (page: ReactElement) => {
  return (
    <>
      <AppHeader />
      <Tabs />
      <Container
        maxW="container.md"
        display="flex"
        justifyContent="center"
        pt={20}
        pb={40}
      >
        {page}
      </Container>
    </>
  );
};

export default Swap;
