import type { NextPageWithLayout } from "../_app";
import { Heading, HStack, VStack, Box, Text } from "@chakra-ui/react";
import Layout from "../../components/app/Layout";
import useMasterChefOwner from "../../hooks/useMasterChefOwner";
import { useWeb3React } from "@web3-react/core";
import AddLPButton from "../../components/app/Farm/AddLPButton";
import FarmBox from "../../components/app/Farm/FarmBox";
import useFarms from "../../hooks/useFarms";

const Farm: NextPageWithLayout = () => {
  const { data: farms } = useFarms();
  const { account } = useWeb3React();
  const masterChefOwner = useMasterChefOwner();

  return (
    <VStack gap={14} w="full">
      <Heading
        size="3xl"
        fontWeight="light"
        textTransform="uppercase"
        letterSpacing="widest"
      >
        Farming
      </Heading>

      {masterChefOwner && masterChefOwner === account ? (
        <HStack align="stretch" flexDir="row-reverse" w="full">
          <AddLPButton />
        </HStack>
      ) : null}

      <Box w="full">
        {!farms || farms.length === 0 ? (
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
            {!farms ? "Loading..." : "No Farm found"}
          </Text>
        ) : (
          farms.map((farm) => <FarmBox key={farm.lpToken} farm={farm} />)
        )}
      </Box>
    </VStack>
  );
};

Farm.getLayout = Layout;

export default Farm;
