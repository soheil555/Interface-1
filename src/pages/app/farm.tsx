import type { NextPageWithLayout } from "../_app";
import { Heading, HStack, VStack } from "@chakra-ui/react";
import Layout from "../../components/app/Layout";
import useMasterChefContract from "../../hooks/useMasterChefContract";
import useMasterChefOwner from "../../hooks/useMasterChefOwner";
import { useWeb3React } from "@web3-react/core";
import AddLPButton from "../../components/app/Farm/AddLPButton";

const Farm: NextPageWithLayout = () => {
  const { account } = useWeb3React();
  const masterChefContract = useMasterChefContract();
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
    </VStack>
  );
};

Farm.getLayout = Layout;

export default Farm;
