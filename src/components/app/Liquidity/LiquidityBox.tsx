import {
  HStack,
  Box,
  Button,
  useDisclosure,
  Text,
  VStack,
  Collapse,
  Flex,
  Divider,
  useColorModeValue,
  Tooltip,
  useClipboard,
  Stack,
} from '@chakra-ui/react'
import useTokenInfo from '../../../hooks/useTokenInfo'
import { Liquidity } from '../../../types'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { formatCurrencyAmount } from '../../../utils'
import RemoveLiquidityButton from './RemoveLiquidityButton'
import { ethers } from 'ethers'
import useTokenNormalizedValueUSD from '../../../hooks/useTokenNormalizedValueUSD'

interface LiquidityBoxProps {
  liquidity: Liquidity
}

const LiquidityBox = ({ liquidity }: LiquidityBoxProps) => {
  const { hasCopied, onCopy } = useClipboard(liquidity.address)
  const { isOpen, onToggle } = useDisclosure()
  const token0Info = useTokenInfo(liquidity.token0)
  const token1Info = useTokenInfo(liquidity.token1)
  const boxBg = useColorModeValue('brand.100', 'brand.900')
  const dividerBg = useColorModeValue('gray.100', 'gray.900')
  const token0ValueUSD = useTokenNormalizedValueUSD(
    token0Info,
    liquidity.amount0
  )
  const token1ValueUSD = useTokenNormalizedValueUSD(
    token1Info,
    liquidity.amount1
  )

  if (!token0Info || !token1Info) return null

  return (
    <Box bg={boxBg} w="full" p={4} borderRadius="lg">
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        justifyContent="space-between"
      >
        <HStack justify="space-between" gap={2}>
          <Flex fontSize={{ base: 'lg', sm: '2xl' }}>
            {token0Info.logo && <token0Info.logo mr={1} />}
            {token1Info.logo && <token1Info.logo />}
          </Flex>

          <Text fontSize={{ base: 'lg', sm: 'xl' }}>
            {token0Info.symbol}/{token1Info.symbol}
          </Text>
        </HStack>
        <Button
          size={{ base: 'sm', sm: 'md' }}
          onClick={onToggle}
          rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          variant="ghost"
        >
          Manage
        </Button>
      </Stack>
      <Collapse in={isOpen}>
        <VStack pt={5} gap={2} align="stretch">
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            justify="space-between"
            fontSize={{ base: 'sm', md: 'md' }}
          >
            <Text fontWeight="bold">Pool token:</Text>
            <Tooltip
              textAlign="center"
              closeOnClick={false}
              hasArrow
              label={hasCopied ? 'copied' : liquidity.address}
            >
              <Text onClick={onCopy} cursor="pointer" noOfLines={1} w="40">
                {liquidity.address}
              </Text>
            </Tooltip>
          </Stack>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            justify="space-between"
            fontSize={{ base: 'sm', md: 'md' }}
          >
            <Text fontWeight="bold">Your total pool token:</Text>
            <Text>
              {liquidity.liquidityBalance.lte(
                ethers.utils.parseEther('0.000001')
              )
                ? formatCurrencyAmount(liquidity.liquidityBalance, 18, 18)
                : formatCurrencyAmount(liquidity.liquidityBalance)}
            </Text>
          </Stack>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            justify="space-between"
            fontSize={{ base: 'sm', md: 'md' }}
          >
            <Text fontWeight="bold">Pooled {token0Info.symbol}:</Text>
            <Text>
              {formatCurrencyAmount(liquidity.amount0, token0Info.decimals)}
            </Text>
          </Stack>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            justify="space-between"
            fontSize={{ base: 'sm', md: 'md' }}
          >
            <Text fontWeight="bold">Pooled {token1Info.symbol}:</Text>
            <Text>
              {formatCurrencyAmount(liquidity.amount1, token1Info.decimals)}
            </Text>
          </Stack>

          <Stack
            direction={{ base: 'column', sm: 'row' }}
            justify="space-between"
            fontSize={{ base: 'sm', md: 'md' }}
          >
            <Text fontWeight="bold">TVL:</Text>
            <Text>
              {token0ValueUSD && token1ValueUSD
                ? `$${formatCurrencyAmount(
                    token0ValueUSD.add(token1ValueUSD),
                    6,
                    2
                  )}`
                : null}
            </Text>
          </Stack>
        </VStack>

        <Divider bgColor={dividerBg} my={2} />

        <HStack justify="end">
          <RemoveLiquidityButton liquidity={liquidity} />
        </HStack>
      </Collapse>
    </Box>
  )
}

export default LiquidityBox
