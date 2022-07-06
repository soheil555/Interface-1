import { type ReactElement } from "react";
import { Container } from "@chakra-ui/react";
import AppHeader from "../common/Header/AppHeader";
import Tabs from "./Tabs/Tabs";

const Layout = (page: ReactElement) => {
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

export default Layout;
