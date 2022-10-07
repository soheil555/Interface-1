import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'
import { Box, Stack, Text, useColorModeValue, VStack } from '@chakra-ui/react'

const Charts = () => {
  const tokenDistroData = {
    labels: [
      'Airdrop Event',
      'ICO Sale',
      'IFO Bonus',
      'Int. Platform Allocation',
      'Developer Fee',
      'Liquidity Bonus',
    ],
    datasets: [
      {
        label: 'Planned Emmission',
        data: [6, 5, 7, 2, 5, 80],
        backgroundColor: [
          'rgb(204, 0, 0)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(128, 0, 0)',
          'rgb(51, 255, 51)',
          'rgb(255, 153, 204)',
        ],
        hoverOffset: 4,
      },
    ],
  }

  const saleProceedAllocData = {
    labels: ['Initial Platform Liquidity', 'Locked Sushiswap Contract'],
    datasets: [
      {
        label: 'ICO Sale Proceeds',
        data: [75, 25],
        backgroundColor: ['rgb(255, 153, 204)', 'rgb(204, 153, 255)'],
        hoverOffset: 4,
      },
    ],
  }

  return (
    <Stack
      mb={10}
      gap={10}
      justify="center"
      align="center"
      direction={{ base: 'column', lg: 'row' }}
    >
      <VStack gap={2} bg={useColorModeValue('gray.50', 'gray.900')} p={10}>
        <Text
          textAlign="center"
          fontWeight="bold"
          fontSize={{ base: 15, sm: 20, md: 25 }}
        >
          Planned Token Emission
        </Text>
        <Text textAlign="center" fontSize={{ base: 'xs', sm: 'sm' }}>
          25,000,000 AxoSwap Token
        </Text>
        <Box
          w={{ base: '16rem', sm: '20rem', lg: '25rem' }}
          h={{ base: '16rem', sm: '20rem', lg: '25rem' }}
        >
          <Pie data={tokenDistroData} />
        </Box>
      </VStack>

      <VStack gap={2} bg={useColorModeValue('gray.50', 'gray.900')} p={10}>
        <Text
          textAlign="center"
          fontWeight="bold"
          fontSize={{ base: 15, sm: 20, md: 25 }}
        >
          ICO Funding Allocation
        </Text>
        <Text textAlign="center" fontSize={{ base: 'xs', sm: 'sm' }}>
          ICO Target: 75000 MATIC
        </Text>
        <Box
          w={{ base: '16rem', sm: '20rem', lg: '25rem' }}
          h={{ base: '16rem', sm: '20rem', lg: '25rem' }}
        >
          <Pie data={saleProceedAllocData} />
        </Box>
      </VStack>
    </Stack>
  )
}

export default Charts
