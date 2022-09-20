import { Box, Button, Text, VStack, Stack } from '@chakra-ui/react'
import { Player } from '@lottiefiles/react-lottie-player'

export default function Protocol() {
  return (
    <VStack justify="flex-start" gap={{ base: 10, lg: 40 }}>
      <Box
        position="absolute"
        zIndex={100}
        bottom={-110}
        right={0}
        display={{ base: 'none', lg: 'block' }}
      >
        <Player
          autoplay
          loop
          src="lottie/scene.json"
          style={{ height: '700px', width: '700px' }}
        ></Player>
      </Box>

      <Text
        textAlign="center"
        fontWeight="bold"
        fontSize={{ base: 'xl', sm: '2xl', lg: '3xl' }}
      >
        Swap tokens, farm liquidity and
        <br /> explore DeFi cutting-edge technology.
      </Text>

      <VStack alignSelf={{ base: 'center', lg: 'flex-start' }} w="47%">
        <Text mb={3}>Need Help?</Text>
        <Stack
          align="center"
          direction={{ base: 'column', sm: 'row', lg: 'column' }}
        >
          <Button
            variant="brand"
            rounded="full"
            w={{ base: '8rem', sm: '10rem', md: '15rem' }}
            fontSize={{ base: 'sm', sm: 'md' }}
          >
            View our Docs
          </Button>
          <Text>Or</Text>
          <Button
            variant="brand"
            rounded="full"
            w={{ base: '8rem', sm: '10rem', md: '15rem' }}
            fontSize={{ base: 'sm', sm: 'md' }}
          >
            Watch our Video
          </Button>
        </Stack>
      </VStack>
    </VStack>
  )
}
