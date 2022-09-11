import {
  Box,
  Collapse,
  HStack,
  IconButton,
  Text,
  useBoolean,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Token } from '../../../types'
import { balanceWithSlippage, calculatePrice } from '../../../utils'

interface SwapInfoProps {
  tokenIn: Token
  tokenOut: Token
  amountIn: string
  amountOut: string
  slippage: string
}

const SwapInfo = ({
  tokenIn,
  tokenOut,
  amountIn,
  amountOut,
  slippage,
}: SwapInfoProps) => {
  const { isOpen, onToggle } = useDisclosure()
  const [priceFlag, setPriceFlag] = useBoolean()

  const amountOutWithSlippage = balanceWithSlippage(
    amountOut,
    slippage,
    tokenOut.decimals
  )

  const tokenOutPrice = calculatePrice(
    amountIn,
    amountOut,
    tokenIn.decimals,
    tokenOut.decimals
  )

  const tokenInPrice = calculatePrice(
    amountOut,
    amountIn,
    tokenIn.decimals,
    tokenOut.decimals
  )

  return (
    <Box
      py={1}
      px={2}
      w="full"
      borderRadius="lg"
      border="solid"
      borderWidth={1}
      borderColor="gray.200"
    >
      <HStack justify="space-between">
        <Box cursor="pointer" onClick={setPriceFlag.toggle}>
          {priceFlag ? (
            <Text fontSize={{ base: 'sm', md: 'md' }}>
              1 {tokenIn.symbol} = {tokenOutPrice} {tokenOut.symbol}
            </Text>
          ) : (
            <Text fontSize={{ base: 'sm', md: 'md' }}>
              1 {tokenOut.symbol} = {tokenInPrice} {tokenIn.symbol}
            </Text>
          )}
        </Box>

        <IconButton
          aria-label="up-down"
          icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onClick={onToggle}
          size="sm"
          variant="ghost"
        />
      </HStack>

      <Collapse in={isOpen}>
        <VStack pt={4} align="stretch">
          <HStack justify="space-between">
            <Text fontSize={{ base: 'sm', md: 'md' }}>Expected Output</Text>
            <Text fontSize={{ base: 'sm', md: 'md' }}>
              {amountOut} {tokenOut.symbol}
            </Text>
          </HStack>

          <HStack justify="space-between">
            <Text fontSize={{ base: 'sm', md: 'md' }}>
              Minimum received after slippage <br /> ({slippage}%)
            </Text>
            <Text fontSize={{ base: 'sm', md: 'md' }}>
              <>
                {amountOutWithSlippage} {tokenOut.symbol}
              </>
            </Text>
          </HStack>
        </VStack>
      </Collapse>
    </Box>
  )
}

export default SwapInfo
