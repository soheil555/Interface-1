import {
  Box,
  Center,
  Container,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'

export const items: {
  title: string
  description: string
  imagePath: string
  top: string
  left: string
  position: 'right' | 'left'
}[] = [
  {
    title: 'White Paper',
    description:
      'While existing solutions offer to solve just one problem team is up to build a secure, use use product based integration, and even a digital.',
    imagePath: '/images/white-paper.png',
    top: '-4%',
    left: '45%',
    position: 'right',
  },
  {
    title: 'Launch',
    description:
      'While existing solutions offer to solve just one problem team is up to build a secure, use use product based integration, and even a digital.',
    imagePath: '/images/launch.svg',
    top: '19%',
    left: '7%',
    position: 'left',
  },
  {
    title: 'Money',
    description:
      'While existing solutions offer to solve just one problem team is up to build a secure, use use product based integration, and even a digital.',
    imagePath: '/images/money.png',
    top: '39%',
    left: '52%',
    position: 'right',
  },
  {
    title: 'Launch',
    description:
      'While existing solutions offer to solve just one problem team is up to build a secure, use use product based integration, and even a digital.',
    imagePath: '/images/launch.svg',
    top: '52%',
    left: '7%',
    position: 'left',
  },
  {
    title: 'Reward',
    description:
      'While existing solutions offer to solve just one problem team is up to build a secure, use use product based integration, and even a digital.',
    imagePath: '/images/reward.png',
    top: '71%',
    left: '52%',
    position: 'right',
  },
  {
    title: 'Launch',
    description:
      'While existing solutions offer to solve just one problem team is up to build a secure, use use product based integration, and even a digital.',
    imagePath: '/images/launch.svg',
    top: '92%',
    left: '7%',
    position: 'left',
  },
]

const Roadmap = () => {
  return (
    <Container maxW="container.xl">
      <VStack mb="10rem" gap="6rem">
        <VStack>
          <Text fontWeight="bold">Axoswap Road Map</Text>
          <Text fontWeight="bold" fontSize="4xl">
            Axoswap.io Road Map
          </Text>
        </VStack>

        <Center zIndex={-100} w="full">
          <Box position="relative" h="60em" w="full">
            <Image
              w="full"
              h="full"
              alt="roadmap"
              src="/images/bg-roadmap-center-desktop.svg"
            />

            {items
              .filter((item) => item.position === 'right')
              .map((item, i) => (
                <HStack
                  key={i}
                  position="absolute"
                  top={item.top}
                  left={item.left}
                  align="flex-start"
                  gap={12}
                >
                  <Box
                    mt={2}
                    bg="brand.100"
                    w="50px"
                    h="50px"
                    rounded="full"
                    position="relative"
                  >
                    <Image
                      width={10}
                      height={10}
                      position="absolute"
                      top={1}
                      left={6}
                      alt={item.imagePath}
                      src={item.imagePath}
                    />
                  </Box>

                  <Box w="70%">
                    <Text
                      textTransform="capitalize"
                      fontWeight="bold"
                      fontSize={22}
                      mb={2}
                    >
                      {item.title}
                    </Text>

                    <Text>{item.description}</Text>
                  </Box>
                </HStack>
              ))}

            {items
              .filter((item) => item.position === 'left')
              .map((item, i) => (
                <HStack
                  key={i}
                  position="absolute"
                  top={item.top}
                  left={item.left}
                  align="flex-start"
                  gap={12}
                >
                  <Box w="34%">
                    <Text
                      textTransform="capitalize"
                      fontWeight="bold"
                      fontSize={22}
                      mb={2}
                    >
                      {item.title}
                    </Text>

                    <Text>{item.description}</Text>
                  </Box>
                  <Box w="140px" h="140px">
                    <Image
                      w="full"
                      h="full"
                      alt={item.imagePath}
                      src={item.imagePath}
                    />
                  </Box>
                </HStack>
              ))}
          </Box>
        </Center>
      </VStack>
    </Container>
  )
}

export default Roadmap
