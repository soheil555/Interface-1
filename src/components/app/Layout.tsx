import { type ReactElement } from "react";
import { Container, Image } from "@chakra-ui/react";
import AppHeader from "../common/Header/AppHeader";
import Tabs from "./Tabs/Tabs";
import TopImage from "./Image/TopImage";
import Background from "/public/images/background.png";
import React from "react";
const Layout = (page: ReactElement) => {
  return (
    <>
      <AppHeader />
      <Container maxW="lg">
        <TopImage />
        <Tabs />
        {page}
      </Container>
      <Image src={Background} />
    </>
  );
}

export default Layout;
