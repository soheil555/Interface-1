import Pool from "../../components/app/Pool";
import Layout from "../../components/app/Layout/Layout";
import type { NextPageWithLayout } from "../_app";
import { VStack } from "@chakra-ui/react";

const Stake: NextPageWithLayout = () => {
  return (
    <VStack gap={5} w="full">
      Stake Your Liquidity Tokens Here And Earn AXO!
      <Pool />
    </VStack>
  );
};
Stake.getLayout = Layout;

export default Stake;
