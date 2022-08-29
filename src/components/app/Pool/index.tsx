import {
  Heading,
  HStack,
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
  Box,
  Text,
} from "@chakra-ui/react";
import StakeAXO from "./StakeAXO";
import UnstakeAXO from "./UnstakeAXO";
import useUnstakedAXOBalance from "../../../hooks/useUnstakedAXOBalance";
import useXltBalance from "../../../hooks/useXltBalance";
import { AXOToken, XolotlToken } from "../../../icons";
import { parseBalance } from "../../../utils";

const Pool = () => {
  const { data: xltBalance } = useXltBalance();
  const { data: unstakedAXOBalance } = useUnstakedAXOBalance();

  return (
    <VStack gap={14} w="full">
      <VStack>
        <Heading size="xl" fontWeight="light" letterSpacing="wider">
          AXO Stake
        </Heading>
        <Text variant="subtext">
          Stake Your Liquidity Tokens Here And Earn AXO!
        </Text>
      </VStack>

      <Stack
        gap={2}
        direction={{ base: "column", md: "row" }}
        w="full"
        justify="space-between"
      >
        <HStack flex={1}>
          <XolotlToken fontSize="4rem" />
          <Stat>
            <StatLabel> Wallet Balance</StatLabel>
            <StatNumber>{xltBalance && parseBalance(xltBalance)}</StatNumber>
            <StatHelpText>XLT</StatHelpText>
          </Stat>
        </HStack>

        <HStack flex={1}>
          <AXOToken fontSize="4rem" />
          <Stat>
            <StatLabel>Wallet Balance</StatLabel>
            <StatNumber>
              {unstakedAXOBalance && parseBalance(unstakedAXOBalance)}
            </StatNumber>
            <StatHelpText>AXO</StatHelpText>
          </Stat>
        </HStack>
      </Stack>

      <Tabs variant="enclosed" w="full" isFitted>
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
      <Box w="full" p={4} borderRadius="lg">
        <HStack justifyContent="space-between">
          <Text fontSize="m">
            This pool automatically earns 15% of all trade fees to buyback AXO,
            increasing ratio overtime
          </Text>
        </HStack>
      </Box>
    </VStack>
  );
};

export default Pool;
