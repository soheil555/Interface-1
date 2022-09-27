import { SimpleGrid, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import AmplifyBadge from '../common/AmplifyBadge'

const Partners = () => {
  return (
    <VStack gap={3} my="6rem">
      <VStack>
        <Text fontWeight="bold">Partners</Text>
        <Text fontWeight="bold" fontSize={{ base: '2xl', lg: '4xl' }}>
          Partnering Platforms
        </Text>
      </VStack>

      <Wrap justify="center" spacing="2rem">
        <WrapItem>
          <AmplifyBadge />
        </WrapItem>
      </Wrap>
    </VStack>
  )
}

export default Partners
