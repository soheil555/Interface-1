import type { NextPageWithLayout } from "../../_app";
import { Stack, VStack, Button, Text, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import Layout from "../../../components/app/Layout";
import useAllPairsWithLiquidity from "../../../hooks/useAllPairsWithLiquidity";
import { useWeb3React } from "@web3-react/core";

const Pool: NextPageWithLayout = () => {
  const { account } = useWeb3React();
  const { data: liquidity } = useAllPairsWithLiquidity(account);

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

      <Heading alignSelf="flex-start" size="lg">
        Your Liquidity
      </Heading>

      {!liquidity || liquidity.length === 0 ? (
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
          {!liquidity ? "Loading..." : "No liquidity found"}
        </Text>
      ) : null}
    </VStack>
  );
};

Pool.getLayout = Layout;
export default Pool;
