import type { NextPageWithLayout } from "../../_app";
import { type ReactElement } from "react";
import { Container } from "@chakra-ui/react";
import AppHeader from "../../../components/common/Header/AppHeader";
import Tabs from "../../../components/app/Tabs";
import SelectPair from "../../../components/app/SelectPair/SelectPair";
import { AiOutlinePlus } from "react-icons/ai";

const CreatePair: NextPageWithLayout = () => {
  const handleCreatePair = () => {};

  return (
    <SelectPair
      header="Create a Pair"
      icon={<AiOutlinePlus />}
      handle={handleCreatePair}
      action="add liquidity"
    />
  );
};

CreatePair.getLayout = (page: ReactElement) => {
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

export default CreatePair;
