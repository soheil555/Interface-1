import { type ReactElement } from "react";
import { Container, Image } from "@chakra-ui/react";
import AppHeader from "../common/Header/AppHeader";
import Tabs from "./Tabs/Tabs";
import TopImage from "./Image/TopImage";
import React from "react";
const Layout = (page: ReactElement) => {
  return (
    <>
 <Image
        src="/images/background.png"
        position="fixed"
        objectFit="cover"
        top="0"
        left="0"
        width="full"
        height="full"
        zIndex={-100}
      />
 <TopImage />
      <AppHeader />
      <Tabs />
      <Container
        maxW="container.md"
        display="flex"
        justifyContent="center"
        pt={20}
        pb={40}
        pl={{ base: undefined, lg: "8rem" }}
        opacity={0.9}
      >
        {page}
      </Container>
    </>
  );
}

export default Layout;
