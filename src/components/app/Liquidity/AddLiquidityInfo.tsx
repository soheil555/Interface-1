import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import usePairReserves from '../../../hooks/useLiquidityPairReserves'
import { Token } from '../../../types'
import { computeLiquidityRate, formatCurrencyAmount } from '../../../utils'

interface AddLiquidityInfoProps {
  token1: Token
  token2: Token
  token1Amount?: string
  token2Amount?: string
}

const AddLiquidityInfo = ({
  token1,
  token2,
  token1Amount,
  token2Amount,
}: AddLiquidityInfoProps) => {
  const { data: reserves } = usePairReserves(token1, token2)
  const token1Rate = computeLiquidityRate(
    token1,
    token2,
    reserves?.reserve1,
    reserves?.reserve2,
    token1Amount,
    token2Amount
  )

  const token2Rate = computeLiquidityRate(
    token2,
    token1,
    reserves?.reserve2,
    reserves?.reserve1,
    token2Amount,
    token1Amount
  )

  return (
    <Box
      p={2}
      w="full"
      borderRadius="lg"
      border="solid"
      borderWidth={1}
      borderColor="gray.200"
    >
      {reserves && (
        <HStack mb={5} justify="space-between">
          <Text alignSelf="flex-start" fontSize={{ base: 'sm', md: 'md' }}>
            Rates
          </Text>
          <VStack>
            {token1Rate && (
              <Text fontSize={{ base: 'sm', md: 'md' }}>
                <>
                  1 {token1.symbol} ={' '}
                  {formatCurrencyAmount(token1Rate, token2.decimals)}{' '}
                  {token2.symbol}
                </>
              </Text>
            )}

            {token2Rate && (
              <Text fontSize={{ base: 'sm', md: 'md' }}>
                <>
                  1 {token2.symbol} ={' '}
                  {formatCurrencyAmount(token2Rate, token1.decimals)}{' '}
                  {token1.symbol}
                </>
              </Text>
            )}
          </VStack>
        </HStack>
      )}

      <HStack justify="space-between">
        <Text>Share of Pool</Text>
        <Text>0.00%</Text>
      </HStack>
    </Box>
  )
}

export default AddLiquidityInfo
