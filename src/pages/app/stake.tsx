import Bar from "../../components/app/Bar";
import Layout from "../../components/app/Layout";
import type { NextPageWithLayout } from "../_app";
import { VStack } from "@chakra-ui/react";

const Stake: NextPageWithLayout = () => {
    return (
        <VStack gap={5} w="full">
            <Bar />
        </VStack>
    )
}
Stake.getLayout = Layout;

export default Stake;
