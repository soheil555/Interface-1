import {
  Box,
  useColorModeValue,
  HStack,
  Text,
  Flex,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
  Stack,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import useFarmUserInfo from '../../../hooks/useFarmUserInfo'
import useLiquidityInfo from '../../../hooks/useLiquidityInfo'
import useMasterChefOwner from '../../../hooks/useMasterChefOwner'
import usePendingAXO from '../../../hooks/usePendingAXO'
import useTokenInfo from '../../../hooks/useTokenInfo'
import { Farm } from '../../../types'
import { formatCurrencyAmount } from '../../../utils'
import EditAllocPointButton from './EditAllocPointButton'
import HarvestButton from './HarvestButton'
import StakeButton from './StakeButton'
import UpdatePoolButton from './UpdatePoolButton'

interface FarmBoxProps {
  farm: Farm
}

const FarmBox = ({ farm }: FarmBoxProps) => {
  const { data: pendingAXO } = usePendingAXO(farm.pid)
  const { data: farmUserInfo } = useFarmUserInfo(farm.pid)
  const tokens = useLiquidityInfo(farm.lpToken)
  const token0Info = useTokenInfo(tokens?.token0)
  const token1Info = useTokenInfo(tokens?.token1)
  const { account } = useWeb3React()
  const masterChefOwner = useMasterChefOwner()
  const boxBg = useColorModeValue('gray.100', 'gray.700')

  if (!token0Info || !token1Info) return null

  return (
    <Box bg={boxBg} w="full" borderRadius="lg">
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        p={4}
        justifyContent="space-between"
      >
        <HStack justify="center" gap={2}>
          <Flex fontSize="2xl">
            {token0Info.logo && <token0Info.logo mr={1} />}
            {token1Info.logo && <token1Info.logo />}
          </Flex>

          <Text fontSize="xl">
            {token0Info.symbol}/{token1Info.symbol}
          </Text>
        </HStack>
        <UpdatePoolButton pid={farm.pid} />
      </Stack>

      <Divider />

      <VStack align="stretch" gap={2} p={4}>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          border="solid"
          borderRadius="lg"
          borderWidth={1}
          borderColor="gray.400"
          justify="space-between"
          p={2}
          align={{ base: 'stretch', sm: 'center' }}
        >
          <Stat>
            <StatLabel>Block Reward Multiply</StatLabel>
            <HStack my={2}>
              <StatNumber fontSize={{ base: 'lg', sm: '2xl' }}>
                {farm.allocPoint.toString()}
              </StatNumber>
              {masterChefOwner && masterChefOwner === account ? (
                <EditAllocPointButton
                  pid={farm.pid}
                  currentAllocPoint={farm.allocPoint.toString()}
                />
              ) : null}
            </HStack>
          </Stat>
          <StakeButton pid={farm.pid} lpToken={farm.lpToken} />
        </Stack>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          border="solid"
          borderRadius="lg"
          borderWidth={1}
          borderColor="gray.400"
          p={2}
          justify="space-between"
          align={{ base: 'stretch', md: 'center' }}
        >
          <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
            <Stat>
              <StatLabel>AXO Earned</StatLabel>
              <StatNumber fontSize={{ base: 'lg', sm: '2xl' }}>
                {pendingAXO ? formatCurrencyAmount(pendingAXO) : '0.00'}
              </StatNumber>
            </Stat>

            <Stat>
              <StatLabel>Staked LP Token</StatLabel>
              <StatNumber fontSize={{ base: 'lg', sm: '2xl' }}>
                {farmUserInfo
                  ? !farmUserInfo.amount.isZero() &&
                    farmUserInfo.amount.lte(ethers.utils.parseEther('0.000001'))
                    ? formatCurrencyAmount(farmUserInfo.amount, 18, 18)
                    : formatCurrencyAmount(farmUserInfo.amount)
                  : '0.00'}
              </StatNumber>
            </Stat>
          </Stack>

          <HarvestButton pid={farm.pid} lpToken={farm.lpToken} />
        </Stack>
      </VStack>
    </Box>
  )
}

export default FarmBox
