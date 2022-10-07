import {
  Box,
  HStack,
  Icon,
  Text,
  useDisclosure,
  Divider,
  Button,
  NumberInput,
  NumberInputField,
  useColorModeValue,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { GiToken } from 'react-icons/gi'
import TokensList from './TokensList'
import useTokenBalance from '../../../hooks/useTokenBalance'
import {
  formatCurrencyAmount,
  parseCurrencyAmount,
  isNumeric,
} from '../../../utils'
import { useFormikContext } from 'formik'
import { SwapFormValues } from '../../../types'
import { useCallback, useEffect } from 'react'
import usePairReserves from '../../../hooks/useLiquidityPairReserves'
import useMaticBalance from '../../../hooks/useMaticBalance'
import useWrapType from '../../../hooks/useWrapType'
import useTokenNormalizedValueUSD from '../../../hooks/useTokenNormalizedValueUSD'
import { tokens } from '../../../tokens'

interface SwapSelectTokenProps {
  isTokenIn?: boolean
}

const SwapSelectToken = ({ isTokenIn }: SwapSelectTokenProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { values, setFieldValue, setValues } =
    useFormikContext<SwapFormValues>()

  const { tokenIn, tokenOut, amountIn, amountOut } = values

  const [token, otherToken] = isTokenIn
    ? [tokenIn, tokenOut]
    : [tokenOut, tokenIn]

  const amount = isTokenIn ? amountIn : amountOut
  const tokenFieldName = isTokenIn ? 'tokenIn' : 'tokenOut'
  const wrapType = useWrapType(tokenIn, tokenOut)
  const coin = tokens.find((token) => token.isCoin === true)
  const hstackBg = useColorModeValue('gray.50', 'gray.600')

  const { data: maticBalance } = useMaticBalance()
  const { data: tokenBalance } = useTokenBalance(token)
  const { data: reserves } = usePairReserves(tokenIn, tokenOut)

  const amountValueUSD = useTokenNormalizedValueUSD(token, amount)
  const coinBalanceValueUSD = useTokenNormalizedValueUSD(coin, maticBalance)
  const tokenBalanceValueUSD = useTokenNormalizedValueUSD(token, tokenBalance)

  const getAmountOut = useCallback(
    (value: string) => {
      const amounts: Record<string, string> = {
        amountIn: value,
        amountOut: '',
      }

      if (values.wrapType !== 'invalid') {
        amounts['amountOut'] = value
        return amounts
      }

      if (
        reserves &&
        tokenIn &&
        tokenOut &&
        reserves.reserve1.gt(0) &&
        reserves.reserve2.gt(0) &&
        value.length > 0
      ) {
        const amountIn = parseCurrencyAmount(value, tokenIn.decimals)
        if (amountIn.gt(0)) {
          const amountInWithFee = amountIn.mul(998)
          const numerator = amountInWithFee.mul(reserves.reserve2)
          const denominator = reserves.reserve1.mul(1000).add(amountInWithFee)
          const amountOut = numerator.div(denominator)
          amounts['amountOut'] = formatCurrencyAmount(
            amountOut,
            tokenOut.decimals
          )
        }
      }

      return amounts
    },
    [reserves, tokenIn, tokenOut, values.wrapType]
  )

  const getAmountIn = useCallback(
    (value: string) => {
      const amounts: Record<string, string> = {
        amountIn: '',
        amountOut: value,
      }

      if (values.wrapType !== 'invalid') {
        amounts['amountIn'] = value
        return amounts
      }

      if (
        reserves &&
        tokenIn &&
        tokenOut &&
        reserves.reserve1.gt(0) &&
        reserves.reserve2.gt(0) &&
        value.length > 0
      ) {
        const amountOut = parseCurrencyAmount(value, tokenOut.decimals)
        if (amountOut.gt(0)) {
          const numerator = reserves.reserve1.mul(amountOut).mul(1000)
          const denominator = reserves.reserve2.sub(amountOut).mul(998)
          const amountIn = numerator.div(denominator).add(1)
          amounts['amountIn'] = formatCurrencyAmount(amountIn, tokenIn.decimals)
        }
      }

      return amounts
    },
    [reserves, tokenIn, tokenOut, values.wrapType]
  )

  useEffect(() => {
    if (tokenFieldName === 'tokenIn') {
      if (token?.isCoin) {
        setFieldValue(`${tokenFieldName}Balance`, maticBalance)
      } else {
        setFieldValue(`${tokenFieldName}Balance`, tokenBalance)
      }
    }
  }, [tokenBalance, maticBalance, token, tokenFieldName])

  useEffect(() => {
    if (tokenFieldName === 'tokenIn') {
      setFieldValue('wrapType', wrapType)
    }
  }, [wrapType, tokenFieldName])

  useEffect(() => {
    if (isTokenIn) {
      let amounts: Record<string, string> = {}

      if (amountIn && !amountOut) {
        amounts = getAmountOut(amountIn)
      } else if (amountOut && !amountIn) {
        amounts = getAmountIn(amountOut)
      }

      setValues((values) => {
        return {
          ...values,
          ...amounts,
          tokenInReserve: reserves?.reserve1,
          tokenOutReserve: reserves?.reserve2,
        }
      })
    }
  }, [reserves, isTokenIn, amountIn, amountOut, getAmountIn, getAmountOut])

  return (
    <Box w="full">
      {token ? (
        <Box
          borderRadius="lg"
          border="solid"
          borderWidth={1}
          borderColor="gray.200"
          overflow="hidden"
        >
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            gap={2}
            _hover={{ bgColor: 'gray.100', color: 'gray.800' }}
            onClick={onOpen}
            cursor="pointer"
            justify="space-between"
            py={4}
            px={4}
          >
            <HStack>
              {token.logo && <token.logo fontSize="2xl" />}
              <Box>
                <Text fontWeight="bold">{token.name}</Text>
                <Text>${token.symbol}</Text>
              </Box>
            </HStack>

            <HStack
              justify={{ base: 'space-between', sm: 'flex-start' }}
              align="flex-start"
            >
              <Text fontSize="sm">Balance</Text>

              <VStack>
                <>
                  {!token.isCoin && !!tokenBalance
                    ? formatCurrencyAmount(tokenBalance, token.decimals)
                    : null}
                  {token.isCoin && !!maticBalance
                    ? formatCurrencyAmount(maticBalance, token.decimals)
                    : null}
                </>

                <>
                  {!tokenBalance || (!maticBalance && 0)}
                  {token.isCoin && coinBalanceValueUSD ? (
                    <Text
                      alignSelf="flex-start"
                      fontSize="sm"
                      variant="subtext"
                    >
                      ≈ ${formatCurrencyAmount(coinBalanceValueUSD, 6, 2)}
                    </Text>
                  ) : null}

                  {!token.isCoin && tokenBalanceValueUSD ? (
                    <Text
                      alignSelf="flex-start"
                      fontSize="sm"
                      variant="subtext"
                    >
                      ≈ ${formatCurrencyAmount(tokenBalanceValueUSD, 6, 2)}
                    </Text>
                  ) : null}
                </>
              </VStack>
            </HStack>
          </Stack>

          <Divider />

          <Box py={8} px={4}>
            <HStack justify="space-between">
              <NumberInput
                w="full"
                min={0}
                p={0}
                value={amount}
                onChange={(value) => {
                  const isValueValid = isNumeric(value, token.decimals)
                  if (isValueValid) {
                    const amounts = isTokenIn
                      ? getAmountOut(value)
                      : getAmountIn(value)
                    setValues((values) => ({ ...values, ...amounts }))
                  }
                }}
              >
                <NumberInputField
                  border="none"
                  placeholder="0.00"
                  fontSize="2xl"
                />
              </NumberInput>

              {isTokenIn ? (
                <Button
                  disabled={!tokenBalance}
                  onClick={() => {
                    if (!token.isCoin && tokenBalance) {
                      const amounts = getAmountOut(
                        formatCurrencyAmount(tokenBalance, token.decimals)
                      )
                      setValues((values) => ({ ...values, ...amounts }))
                    } else if (token.isCoin && maticBalance) {
                      const amounts = getAmountOut(
                        formatCurrencyAmount(maticBalance, token.decimals)
                      )
                      setValues((values) => ({ ...values, ...amounts }))
                    }
                  }}
                  fontSize="sm"
                >
                  MAX
                </Button>
              ) : null}
            </HStack>
            {amountValueUSD && (
              <Text pt={1} pl={2} variant="subtext">
                ≈ ${formatCurrencyAmount(amountValueUSD, 6, 2)}
              </Text>
            )}
          </Box>
        </Box>
      ) : (
        <HStack
          onClick={onOpen}
          cursor="pointer"
          borderRadius="lg"
          boxShadow="md"
          bg={hstackBg}
          py={6}
          px={4}
        >
          <Icon fontSize="xl" as={GiToken} />
          <Text>Select a token</Text>
        </HStack>
      )}

      <TokensList
        setSelectedToken={(token) => {
          if (otherToken !== token) {
            setFieldValue(tokenFieldName, token)
          }
        }}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  )
}

export default SwapSelectToken
