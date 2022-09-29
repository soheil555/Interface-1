import {
  Container,
  Link,
  Text,
  VStack,
  Wrap,
  WrapItem,
  Image,
} from '@chakra-ui/react'

interface Partner {
  name: string
  website: string
  iconPath: string
}

const partners: Partner[] = [
  {
    name: 'Alchemy',
    website: 'https://www.alchemy.com/',
    iconPath: '/images/alchemy.svg',
  },
]

const PartnerDiv = ({ partner }: { partner: Partner }) => {
  const { name, website, iconPath } = partner

  return (
    <Link href={website} isExternal>
      <WrapItem
        w={200}
        p={5}
        bg="gray.50"
        rounded="lg"
        _hover={{ bg: 'gray.100' }}
      >
        <Image
          objectFit="contain"
          alt={name}
          src={iconPath}
          w="full"
          h="full"
        />
      </WrapItem>
    </Link>
  )
}

const Partners = () => {
  return (
    <Container maxW="container.xl">
      <VStack gap={3} my="6rem">
        <VStack>
          <Text fontWeight="bold" fontSize={{ base: '2xl', lg: '4xl' }}>
            Partners
          </Text>
        </VStack>

        <Wrap justify="center" spacing="2rem">
          {partners.map((partner, i) => (
            <PartnerDiv key={i} partner={partner} />
          ))}
        </Wrap>
      </VStack>
    </Container>
  )
}

export default Partners
