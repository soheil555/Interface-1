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
  Text,
} from '@chakra-ui/react'
import StakeAXOPanel from '../../components/app/Stake/StakeAXOPanel'
import UnstakeAXOPanel from '../../components/app/Stake/UnstakeAXOPanel'
import useUnstakedAXOBalance from '../../hooks/useUnstakedAXOBalance'
import useXltBalance from '../../hooks/useXltBalance'
import { AXOToken, XolotlToken } from '../../icons'
import { parseBalance } from '../../utils'
import Layout from '../../components/app/Layout/Layout'
import { NextPage } from 'next'

const Stake: NextPage = () => {
  const { data: xltBalance } = useXltBalance()
  const { data: unstakedAXOBalance } = useUnstakedAXOBalance()

  return (
    <Layout>
      <VStack gap={14} w="full">
        <VStack gap={3}>
          <Heading size="3xl" fontWeight="light" letterSpacing="wider">
            AXO Stake
          </Heading>
          <Text variant="subtext">Stake Your AXO Tokens Here!</Text>
        </VStack>

        <Stack
          gap={2}
          direction={{ base: 'column', md: 'row' }}
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
              <StakeAXOPanel />
            </TabPanel>
            <TabPanel>
              <UnstakeAXOPanel />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Text textAlign="center" variant="subtext" fontSize="m">
          This pool automatically earns 15% of all trade fees to buyback AXO,
          increasing ratio overtime.
        </Text>
      </VStack>
    </Layout>
  )
}

export default Stake
