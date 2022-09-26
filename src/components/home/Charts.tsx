import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'
import { Box, Stack, Text, useColorModeValue, VStack } from '@chakra-ui/react'

const Charts = () => {
  const tokenDistroData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [40, 30, 20],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  }

  const saleProceedAllocData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [40, 30, 20],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
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
      <VStack
        gap={2}
        justify="center"
        bg={useColorModeValue('gray.50', 'gray.900')}
        w="30rem"
        h="30rem"
      >
        <Text fontWeight="bold" fontSize={25}>
          Initial Token Distribution
        </Text>

        <Box>
          <Pie data={tokenDistroData} />
        </Box>
      </VStack>

      <VStack
        gap={2}
        justify="center"
        bg={useColorModeValue('gray.50', 'gray.900')}
        w="30rem"
        h="30rem"
      >
        <Text fontWeight="bold" fontSize={25}>
          Sale Proceed Allocation
        </Text>

        <Box>
          <Pie data={saleProceedAllocData} />
        </Box>
      </VStack>
    </Stack>
  )
}

export default Charts
