import type { NextPageWithLayout } from "../../_app";
import {
  Stack,
  VStack,
  Button,
  Text,
  Heading,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Layout from "../../../components/app/Layout";
import useAllPairsWithLiquidity from "../../../hooks/useAllPairsWithLiquidity";
import { useWeb3React } from "@web3-react/core";
import LiquidityBox from "../../../components/app/Liquidity/LiquidityBox";

const Pool: NextPageWithLayout = () => {
  const { account } = useWeb3React();
  const { data: liquidities } = useAllPairsWithLiquidity(account);

  return (
    <VStack gap={5} w="full">
      <VStack
        bg={useColorModeValue("white", "gray.900")}
        boxShadow="lg"
        borderRadius="lg"
        p={4}
        gap={22}
        w="full"
      >
        <Stack
          align="center"
          direction={{ base: "column", md: "row" }}
          w="full"
        >
          <NextLink href="/app/pool/add-liquidity">
            <Button variant="brand-2-outline" w="full">
              create a pair
            </Button>
          </NextLink>
          <NextLink href="/app/pool/add-liquidity">
            <Button variant="brand-2-outline" w="full">
              Add Liquidity
            </Button>
          </NextLink>
        </Stack>

        <Heading alignSelf="flex-start" size="lg">
          Your Liquidity
        </Heading>
        <Divider />

        {!liquidities || liquidities.length === 0 ? (
          <Text
            textAlign="center"
            variant="subtext"
            w="full"
            py={4}
            borderRadius="lg"
            border="solid"
            borderWidth={1}
            borderColor="gray.200"
            overflow="hidden"
          >
            {!liquidities ? "Loading..." : "No liquidity found"}
          </Text>
        ) : (
          liquidities.map((liquidity) => (
            <LiquidityBox key={liquidity.address} liquidity={liquidity} />
          ))
        )}
      </VStack>
    </VStack>
  );
};

Pool.getLayout = Layout;
export default Pool;
