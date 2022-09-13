import { Stack, VStack, Button, Text, Heading, Divider } from '@chakra-ui/react'
import NextLink from 'next/link'
import Layout from '../../../components/app/Layout/Layout'
import useAccountLiquidityPairs from '../../../hooks/useAccountLiquidityPairs'
import { useWeb3React } from '@web3-react/core'
import LiquidityBox from '../../../components/app/Liquidity/LiquidityBox'
import { NextPage } from 'next'

const Pool: NextPage = () => {
  const { account } = useWeb3React()
  const { data: liquidities } = useAccountLiquidityPairs(account)

  return (
    <Layout>
      <VStack gap={22} w="full">
        <Stack
          align="center"
          direction={{ base: 'column', md: 'row' }}
          w="full"
        >
          <NextLink href="/app/liquid/add-liquidity">
            <Button variant="brand-outline" w="full">
              create a pair
            </Button>
          </NextLink>
          <NextLink href="/app/liquid/add-liquidity">
            <Button variant="brand-outline" w="full">
              Add Liquidity
            </Button>
          </NextLink>
        </Stack>

        <Heading alignSelf="flex-start" size="xl" fontWeight="light">
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
            {!liquidities ? 'Loading...' : 'No liquidity found'}
          </Text>
        ) : (
          liquidities.map((liquidity) => (
            <LiquidityBox key={liquidity.address} liquidity={liquidity} />
          ))
        )}
      </VStack>
    </Layout>
  )
}

export default Pool
