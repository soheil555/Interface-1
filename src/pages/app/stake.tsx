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
import AXOToken from '../../icons/AXOToken'
import XolotlToken from '../../icons/XolotlToken'
import { formatCurrencyAmount } from '../../utils'
import Layout from '../../components/app/Layout/Layout'
import { NextPage } from 'next'

const Stake: NextPage = () => {
  const { data: xltBalance } = useXltBalance()
  const { data: unstakedAXOBalance } = useUnstakedAXOBalance()

  return (
    <Layout>
      <VStack gap={14} w="full">
        <VStack gap={3}>
          <Heading
            size={{ base: 'xl', sm: '3xl' }}
            fontWeight="light"
            letterSpacing="wider"
          >
            AXO Stake
          </Heading>
          <Text fontSize={{ base: 'sm', sm: 'md' }} variant="subtext">
            Stake Your AXO Tokens Here!
          </Text>
        </VStack>

        <Stack
          gap={2}
          direction={{ base: 'column', md: 'row' }}
          w="full"
          justify="space-between"
        >
          <HStack flex={1}>
            <XolotlToken fontSize={{ base: '3rem', sm: '4rem' }} />
            <Stat>
              <StatLabel> Wallet Balance</StatLabel>
              <StatNumber fontSize={{ base: 'md', sm: 'xl' }}>
                {xltBalance && formatCurrencyAmount(xltBalance)}
              </StatNumber>
              <StatHelpText>XLT</StatHelpText>
            </Stat>
          </HStack>

          <HStack flex={1}>
            <AXOToken fontSize={{ base: '3rem', sm: '4rem' }} />
            <Stat>
              <StatLabel>Wallet Balance</StatLabel>
              <StatNumber fontSize={{ base: 'md', sm: 'xl' }}>
                {unstakedAXOBalance && formatCurrencyAmount(unstakedAXOBalance)}
              </StatNumber>
              <StatHelpText>AXO</StatHelpText>
            </Stat>
          </HStack>
        </Stack>

        <Tabs variant="enclosed" w="full" isFitted>
          <TabList>
            <Tab fontSize={{ base: 'sm', sm: 'md' }}>Stake AXO</Tab>
            <Tab fontSize={{ base: 'sm', sm: 'md' }}>Unstake</Tab>
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
        <Text
          textAlign="center"
          variant="subtext"
          fontSize={{ base: 'sm', sm: 'md' }}
        >
          This pool automatically earns 15% of all trade fees to buyback AXO,
          increasing ratio overtime.
        </Text>
      </VStack>
    </Layout>
  )
}

export default Stake
