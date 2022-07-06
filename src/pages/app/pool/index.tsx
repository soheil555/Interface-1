import type { NextPageWithLayout } from "../../_app";
import { Stack, VStack, Button, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import Layout from "../../../components/app/Layout";

const Pool: NextPageWithLayout = () => {
  return (
    <VStack gap={22} w="full">
      <Stack align="center" direction={{ base: "column", md: "row" }} w="full">
        <NextLink href="/app/pool/add-liquidity">
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

Pool.getLayout = Layout;
export default Pool;
