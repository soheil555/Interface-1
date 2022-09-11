import { Box, HStack, Text } from '@chakra-ui/react'
import usePairReserves from '../../../hooks/usePairReserves'
import { Token } from '../../../types'
import { calculateLiquidityRate, parseBalance } from '../../../utils'

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
  const rate = calculateLiquidityRate(
    token1,
    token2,
    reserves?.reserve1,
    reserves?.reserve2,
    token1Amount,
    token2Amount
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
      {reserves && (
        <HStack justify="space-between">
          <Text fontSize={{ base: 'sm', md: 'md' }}>Rate</Text>
          {rate && (
            <Text fontSize={{ base: 'sm', md: 'md' }}>
              <>
                1 {token1.symbol} = {parseBalance(rate, token2.decimals)}{' '}
                {token2.symbol}
              </>
            </Text>
          )}
        </HStack>
      )}
    </Box>
  )
}

export default AddLiquidityInfo
