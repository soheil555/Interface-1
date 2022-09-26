import { Box, Center, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { items } from './Roadmap'

const RoadmapResponsive = () => {
  return (
    <VStack mb="4rem" gap="4rem">
      <VStack>
        <Text fontWeight="bold" textAlign="center">
          Cryptoland Road Map
        </Text>
        <Text fontWeight="bold" textAlign="center" fontSize="2xl">
          Crypto Road Map
        </Text>
      </VStack>
      <HStack h="60rem" gap={2}>
        <Box h="full" w="2rem" bg="brand.gradient" rounded="xl" />

        <VStack h="full" justify="space-between">
          {items.map((item, i) => (
            <HStack gap={2} key={i}>
              {item.position === 'right' ? (
                <Center
                  mt={2}
                  bg="brand.100"
                  p={2}
                  w="50px"
                  h="50px"
                  rounded="full"
                >
                  <Image
                    w="full"
                    h="full"
                    alt={item.imagePath}
                    src={item.imagePath}
                  />
                </Center>
              ) : (
                <Box w="100px" h="100px">
                  <Image
                    w="full"
                    h="full"
                    alt={item.imagePath}
                    src={item.imagePath}
                  />
                </Box>
              )}

              <VStack w={{ base: '90%', md: '70%' }} align="stretch">
                <Text fontWeight="bold">{item.title}</Text>
                <Text fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}>
                  {item.description}
                </Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </HStack>
    </VStack>
  )
}

export default RoadmapResponsive
