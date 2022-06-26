import type { NextPageWithLayout } from "../_app";
import type { ReactElement } from "react";
import { Box, Container } from "@chakra-ui/react";

import AppHeader from "../../components/common/Header/AppHeader";
import Tabs from "../../components/app/Tabs";

const Swap: NextPageWithLayout = () => {
  return <Box></Box>;
};

Swap.getLayout = (page: ReactElement) => {
  return (
    <>
      <AppHeader />
      <Tabs />
      <Container maxW="container.xl" pt={40}>
        {page}
      </Container>
    </>
  );
};

export default Swap;
