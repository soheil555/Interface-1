import { type ReactElement } from "react";
import { Container } from "@chakra-ui/react";
import AppHeader from "../common/Header/AppHeader";
import Tabs from "./Tabs/Tabs";
import SideImage from "./Image/SideImage";
import TopImage from "./Image/TopImage";

const Layout = (page: ReactElement) => {
  return (
    <>
      <TopImage />
      <AppHeader />
      <SideImage />
      <Tabs />
      <Container
        maxW="container.md"
        display="flex"
        justifyContent="center"
        pt={20}
        pb={40}
        pl={{ base: undefined, lg: "8rem" }}
      >
        {page}
      </Container>
    </>
  );
};

export default Layout;
