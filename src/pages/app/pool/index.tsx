import type { NextPageWithLayout } from "../../_app";
import { type ReactElement } from "react";
import { Container, Stack, VStack, Button, Text } from "@chakra-ui/react";
import AppHeader from "../../../components/common/Header/AppHeader";
import Tabs from "../../../components/app/Tabs";
import NextLink from "next/link";

const Pool: NextPageWithLayout = () => {
  return (
    <VStack gap={22} w="full">
      <Stack align="center" direction={{ base: "column", md: "row" }} w="full">
        <NextLink href="/app/pool/create-pair">
          <Button variant="brand-2-outline" w="full">
            create a pair
          </Button>
        </NextLink>
        <NextLink href="/app/pool/add-liquidity">
          <Button variant="brand-2-outline" w="full">
            add liquidity
          </Button>
        </NextLink>
      </Stack>

      <Text
        textAlign="center"
        variant="gray"
        w="full"
        py={4}
        borderRadius="lg"
        border="solid"
        borderWidth={1}
        borderColor="gray.200"
        overflow="hidden"
      >
        No liquidity found
      </Text>
    </VStack>
  );
};

Pool.getLayout = (page: ReactElement) => {
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

export default Pool;
