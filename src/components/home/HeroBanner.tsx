import {
  Heading,
  Text,
  Box,
  Image,
  VStack,
  Button,
  Stack,
  Container,
} from '@chakra-ui/react'
import Counter from './Counter'
import { Player } from '@lottiefiles/react-lottie-player'

const HeroBanner = () => {
  return (
    <Container maxW="container.xl">
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        pt={{ base: 0, lg: 10 }}
        pb={16}
        gap={20}
        align={{ base: 'center', lg: 'flex-start' }}
        justify="stretch"
      >
        <Box
          position="absolute"
          zIndex={-100}
          top={0}
          left={0}
          w="full"
          h={{ base: '450px', md: '600px', lg: '720px' }}
        >
          <Image
            alt="top hero image"
            w="full"
            h="full"
            objectFit="cover"
            src="/images/bg-hero-top-desktop.png"
          />
        </Box>

        <VStack flex={1} align={{ base: 'center', md: 'flex-start' }}>
          <Box pt={{ base: 2, lg: 24 }} pb={{ base: 10, md: 24 }}>
            <Heading
              mb={1}
              color="white"
              textAlign="center"
              fontSize={{ base: '5xl', md: '7xl' }}
              lineHeight="1"
            >
              AXOSWAP
              <Box
                fontWeight="light"
                fontSize={{ base: '1.1rem', md: '1.6rem' }}
              >
                DECENTRALIZED EXCHANGE
              </Box>
            </Heading>
          </Box>

          <Counter />

          <VStack pt="3rem" w="full" gap={3}>
            <Text fontSize="lg" textAlign="center">
              Project Status: ICO event live on Sushiswap!
            </Text>
            <Button variant="brand" rounded="full" w="15rem">
              Join Event
            </Button>
          </VStack>
        </VStack>
        <Box w={{ base: '280px', sm: '400px', md: '500px' }}>
          <Player
            autoplay
            loop
            src="/lottie/Hero.json"
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
      </Stack>
    </Container>
  )
}
export default HeroBanner
