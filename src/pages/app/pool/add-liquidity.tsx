import type { NextPageWithLayout } from "../../_app";
import { type ReactElement } from "react";
import { Container, Stack, VStack, Button, Text } from "@chakra-ui/react";
import AppHeader from "../../../components/common/Header/AppHeader";
import Tabs from "../../../components/app/Tabs";
import SelectPair from "../../../components/app/SelectPair/SelectPair";
import { AiOutlinePlus } from "react-icons/ai";

const AddLiquidity: NextPageWithLayout = () => {
  const handleCreatePair = () => {};

  return (
    <SelectPair
      header="Add Liquidity"
      icon={<AiOutlinePlus />}
      handle={handleCreatePair}
      action="add liquidity"
    />
  );
};

AddLiquidity.getLayout = (page: ReactElement) => {
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

export default AddLiquidity;
