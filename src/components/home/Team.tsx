import {
  Avatar,
  Button,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {
  FiArrowRight,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
} from 'react-icons/fi'

interface TeamMember {
  fullName: string
  description: string
  addresses: {
    twitter?: string
    instagram?: string
    linkedIn?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    fullName: 'Vanessa Kirby',
    description: 'Continually Onceptal Technc Professionally moneze',
    addresses: {
      twitter: '#',
      instagram: '#',
      linkedIn: '#',
    },
  },
  {
    fullName: 'Vanessa Kirby',
    description: 'Continually Onceptal Technc Professionally moneze',
    addresses: {
      twitter: '#',
      instagram: '#',
      linkedIn: '#',
    },
  },
  {
    fullName: 'Vanessa Kirby',
    description: 'Continually Onceptal Technc Professionally moneze',
    addresses: {
      twitter: '#',
      instagram: '#',
      linkedIn: '#',
    },
  },
  {
    fullName: 'Vanessa Kirby',
    description: 'Continually Onceptal Technc Professionally moneze',
    addresses: {
      twitter: '#',
      instagram: '#',
      linkedIn: '#',
    },
  },
]

const TeamMemberDiv = ({ teamMember }: { teamMember: TeamMember }) => {
  const { fullName, description, addresses } = teamMember

  return (
    <VStack gap={2}>
      <Avatar size="2xl" />
      <Text fontWeight="bold" fontSize="2xl">
        {fullName}
      </Text>
      <Text textAlign="center">{description}</Text>
      <HStack gap={2}>
        {addresses.twitter && (
          <Link href="#">
            <FiTwitter />
          </Link>
        )}

        {addresses.instagram && (
          <Link href="#">
            <FiInstagram />
          </Link>
        )}

        {addresses.linkedIn && (
          <Link href="#">
            <FiLinkedin />
          </Link>
        )}
      </HStack>
    </VStack>
  )
}

const Team = () => {
  return (
    <VStack my={20} gap={10}>
      <VStack>
        <Text fontWeight="bold">Our Team</Text>
        <Text fontWeight="bold" fontSize={{ base: '2xl', lg: '4xl' }}>
          Our Team Member
        </Text>
      </VStack>

      <HStack gap={5}>
        <NextLink href="#">
          <Button rightIcon={<FiArrowRight />} variant="brand">
            Leadership
          </Button>
        </NextLink>
        <NextLink href="#">
          <Button rightIcon={<FiArrowRight />} variant="brand-outline">
            Advisors
          </Button>
        </NextLink>
      </HStack>

      <SimpleGrid columns={[1, 2, 3, 4]} spacing="2rem">
        {teamMembers.map((teamMember, i) => (
          <TeamMemberDiv key={i} teamMember={teamMember} />
        ))}
      </SimpleGrid>
    </VStack>
  )
}

export default Team
