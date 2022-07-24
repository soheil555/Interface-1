import {
  Heading,
  HStack,
  useColorModeValue,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import StakeAXO from "../../components/app/Bar/StakeAXO";
import UnstakeAXO from "../../components/app/Bar/UnstakeAXO";
import Layout from "../../components/app/Layout";
import useUnstakedAXOBalance from "../../hooks/useUnstakedAXOBalance";
import useXltBalance from "../../hooks/useXltBalance";
import { AXOToken, XolotlToken } from "../../icons";
import { parseBalance } from "../../utils";
import { NextPageWithLayout } from "../_app";

const Bar: NextPageWithLayout = () => {
  const { data: xltBalance } = useXltBalance();
  const { data: unstakedAXOBalance } = useUnstakedAXOBalance();

  return (
    <VStack
      bg={useColorModeValue("white", "gray.700")}
      boxShadow="lg"
      borderRadius="lg"
      p={4}
      gap={14}
      w="full"
    >
      <Heading size="xl" fontWeight="light" letterSpacing="wider">
        Staking AXO for XLT
      </Heading>

      <Stack
        gap={2}
        direction={{ base: "column", md: "row" }}
        w="full"
        justify="space-between"
      >
        <HStack flex={1}>
          <XolotlToken fontSize="4rem" />
          <Stat>
            <StatLabel>Balance</StatLabel>
            <StatNumber>{xltBalance && parseBalance(xltBalance)}</StatNumber>
            <StatHelpText>XLT</StatHelpText>
          </Stat>
        </HStack>

        <HStack flex={1}>
          <AXOToken fontSize="4rem" />
          <Stat>
            <StatLabel>Unstaked</StatLabel>
            <StatNumber>
              {unstakedAXOBalance && parseBalance(unstakedAXOBalance)}
            </StatNumber>
            <StatHelpText>AXO</StatHelpText>
          </Stat>
        </HStack>
      </Stack>

      <Tabs colorScheme="brand" variant="enclosed" w="full" isFitted>
        <TabList>
          <Tab>Stake AXO</Tab>
          <Tab>Unstake</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <StakeAXO />
          </TabPanel>
          <TabPanel>
            <UnstakeAXO />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

Bar.getLayout = Layout;

export default Bar;
