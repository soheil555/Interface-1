import { type ReactElement } from "react";
import {
  Container,
  Divider,
  Image,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Header from "../Header/Header";
import React from "react";
import Footer from "../../common/Footer";

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
      <Header />
      <Container
        maxW="container.md"
        display="flex"
        justifyContent="center"
        pt={20}
        pb={40}
      >
        <VStack
          bg={useColorModeValue("white", "gray.900")}
          boxShadow="lg"
          borderRadius="lg"
          align="stretch"
          gap={2}
          w="full"
        >
          {page}
          <Divider />
          <Footer />
        </VStack>
      </Container>
    </>
  );
};

export default Layout;
