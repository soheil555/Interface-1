import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'
import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'

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
    <Container maxW="container.xl">
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
            Initial Token Distribution
          </Text>

          <Box
            w={{ base: '13rem', sm: '20rem', lg: '25rem' }}
            h={{ base: '13rem', sm: '20rem', lg: '25rem' }}
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
            Sale Proceed Allocation
          </Text>

          <Box
            w={{ base: '13rem', sm: '20rem', lg: '25rem' }}
            h={{ base: '13rem', sm: '20rem', lg: '25rem' }}
          >
            <Pie data={saleProceedAllocData} />
          </Box>
        </VStack>
      </Stack>
    </Container>
  )
}

export default Charts
