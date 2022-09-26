import Header from '../components/home/Header'
import HeroBanner from '../components/home/HeroBanner'
import Protocol from '../components/home/Protocol'
import Footer from '../components/common/Footer'
import { Box, Container, useColorModeValue } from '@chakra-ui/react'
import { NextPage } from 'next'
import Roadmap from '../components/home/Roadmap'
import Charts from '../components/home/Charts'

const Home: NextPage = () => {
  return (
    <>
      <Container maxW="container.xl">
        <Header />
        <HeroBanner />
        <Roadmap />
        <Charts />
      </Container>

      <Box bg={useColorModeValue('gray.50', 'gray.900')}>
        <Box position="relative" h={{ base: undefined, lg: '40rem' }}>
          <Container pt={10} maxW="container.xl" h="full">
            <Protocol />
          </Container>
        </Box>

        <Box px={10} pt={10}>
          <Footer />
        </Box>
      </Box>
    </>
  )
}

export default Home
