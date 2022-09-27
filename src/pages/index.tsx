import Header from '../components/home/Header'
import HeroBanner from '../components/home/HeroBanner'
import Protocol from '../components/home/Protocol'
import Footer from '../components/common/Footer'
import { Box, Container, useColorModeValue } from '@chakra-ui/react'
import { NextPage } from 'next'
import Roadmap from '../components/home/Roadmap/Roadmap'
import Charts from '../components/home/Charts'
import RoadmapResponsive from '../components/home/Roadmap/RoadmapResponsive'
import Partners from '../components/home/Partners'

const Home: NextPage = () => {
  return (
    <>
      <Container maxW="container.xl">
        <Header />
        <HeroBanner />
        <Box display={{ base: 'none', lg: 'block' }}>
          <Protocol />
        </Box>

        <Box display={{ base: 'block', lg: 'none' }}>
          <RoadmapResponsive />
        </Box>
        <Charts />
        <Partners />
      </Container>

      <Box bg={useColorModeValue('gray.50', 'gray.900')}>
        <Box position="relative" h={{ base: undefined, lg: '40rem' }}>
          <Container pt={10} maxW="container.xl" h="full">
            <Roadmap />
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
