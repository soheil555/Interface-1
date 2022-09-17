import {
  Heading,
  VStack,
  Text,
  Stack,
  Divider,
  HStack,
  FormControl,
  FormLabel,
  Switch,
  useBoolean,
} from '@chakra-ui/react'
import Layout from '../../components/app/Layout/Layout'
import useMasterChefOwner from '../../hooks/useMasterChefOwner'
import { useWeb3React } from '@web3-react/core'
import AddLPButton from '../../components/app/Farm/AddLPButton'
import FarmBox from '../../components/app/Farm/FarmBox'
import useFarms from '../../hooks/useFarms'
import UpdatePoolsButton from '../../components/app/Farm/UpdatePoolsButton'
import { NextPage } from 'next'

const Farm: NextPage = () => {
  const [stakedOnly, setStakedOnly] = useBoolean()
  const { account } = useWeb3React()
  const { data: farms } = useFarms(stakedOnly ? account : undefined)

  const masterChefOwner = useMasterChefOwner()

  return (
    <Layout>
      <VStack gap={14} w="full">
        <VStack gap={3}>
          <Heading
            size={{ base: 'md', sm: 'xl', md: '3xl' }}
            fontWeight="light"
            textTransform="uppercase"
            letterSpacing="widest"
          >
            Liquidity Pool
          </Heading>
          <Text variant="subtext" fontSize="m">
            Stake your LPs here to earn AXO block reward.
          </Text>
        </VStack>

        <Stack
          direction={{ base: 'column', lg: 'row' }}
          gap={2}
          align="stretch"
          w="full"
        >
          {masterChefOwner && masterChefOwner === account ? (
            <AddLPButton />
          ) : null}
          <UpdatePoolsButton />
        </Stack>

        <VStack gap={5} w="full">
          <HStack
            w="full"
            gap={3}
            justify={{ base: 'space-between', sm: 'flex-start' }}
          >
            <Heading fontWeight="light" size={{ base: 'sm', sm: 'lg' }}>
              Farms
            </Heading>
            <HStack>
              <Switch
                size={{ base: 'md', sm: 'lg' }}
                isChecked={stakedOnly}
                onChange={setStakedOnly.toggle}
              />
              <FormLabel size={{ base: 'sm', sm: 'lg' }}>Staked only</FormLabel>
            </HStack>
          </HStack>

          <Divider />

          {!farms || farms.length === 0 ? (
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
              {!farms ? 'Loading...' : 'No Farm found'}
            </Text>
          ) : (
            farms.map((farm) => <FarmBox key={farm.lpToken} farm={farm} />)
          )}
        </VStack>
      </VStack>
    </Layout>
  )
}

export default Farm
