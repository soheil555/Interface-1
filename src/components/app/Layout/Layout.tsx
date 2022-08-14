import { type ReactElement } from "react";
import { Box, Container, Image, VStack } from "@chakra-ui/react";
import AppHeader from "../../common/Header/AppHeader";
import React from "react";
import AmplifyBadge from "../../common/AmplifyBadge";

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
      <AppHeader />
      <Container
        maxW="container.md"
        display="flex"
        justifyContent="center"
        pt={20}
        pb={40}
      >
        <VStack gap={2} w="full">
          {page}
          <Box alignSelf="center">
            <AmplifyBadge />
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default Layout;
