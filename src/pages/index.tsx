import Header from '../components/home/Header'
import HeroBanner from '../components/home/HeroBanner'
import Protocol from '../components/home/Protocol'
import Footer from '../components/common/Footer'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { NextPage } from 'next'
import Roadmap from '../components/home/Roadmap/Roadmap'
import Charts from '../components/home/Charts'
import RoadmapResponsive from '../components/home/Roadmap/RoadmapResponsive'
import Team from '../components/home/Team'
import Partners from '../components/home/Partners'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <HeroBanner />

      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        my={10}
        position="relative"
        h={{ base: undefined, lg: '40rem' }}
      >
        <Protocol />
      </Box>

      <Box display={{ base: 'none', lg: 'block' }}>
        <Roadmap />
      </Box>

      <Box display={{ base: 'block', lg: 'none' }}>
        <RoadmapResponsive />
      </Box>

      <Charts />
      <Team />
      <Partners />

      <Box bg={useColorModeValue('gray.50', 'gray.900')} px={10} pt={10}>
        <Footer />
      </Box>
    </>
  )
}

export default Home
