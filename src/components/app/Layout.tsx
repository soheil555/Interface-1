import { type ReactElement } from "react";
import { Container, Image } from "@chakra-ui/react";
import AppHeader from "../common/Header/AppHeader";
import Tabs from "./Tabs/Tabs";
import React from "react";
const Layout = (page: ReactElement) => {
  return (
    <>
      <Image
        src="/images/background.svg"
        position="fixed"
        objectFit="cover"
        top="0"
        left="0"
        width="full"
        height="full"
        zIndex={-100}
      />
      <AppHeader />
      <Tabs />
      <Container
        maxW="container.md"
        display="flex"
        justifyContent="center"
        pt={20}
        pb={40}
        // opacity={0.9}
      >
        {page}
      </Container>
    </>
  );
};

export default Layout;
