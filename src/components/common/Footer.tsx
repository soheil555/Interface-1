import {
  HStack,
  Image,
  Link,
  Box,
  VStack,
  Divider,
  Text,
  Stack,
  IconButton,
} from '@chakra-ui/react'
import { BsTwitter, BsGithub, BsDiscord } from 'react-icons/bs'
import AmplifyBadge from './AmplifyBadge'
import NextLink from 'next/link'

const Footer = () => {
  return (
    <VStack align="center" justify="center" p={5} gap={5}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        align="flex-start"
        justify="space-between"
        w="full"
        gap={7}
      >
        <VStack flex={1} align="stretch">
          <Box>
            <Text fontSize="xl">Axoswap</Text>
            <Text variant="subtext">Decentralized exchange</Text>
          </Box>
          <HStack>
            <Link href="https://twitter.com/axoswap" isExternal>
              <IconButton
                aria-label="twitter"
                size="sm"
                fontSize="xl"
                variant="outline"
                icon={<BsTwitter />}
              />
            </Link>
            <Link href="https://github.com/Axoswap-Project" isExternal>
              <IconButton
                aria-label="github"
                size="sm"
                fontSize="xl"
                variant="outline"
                icon={<BsGithub />}
              />
            </Link>

            <Link href="https://discord.gg/PJr44AxWAt" isExternal>
              <IconButton
                aria-label="discord"
                size="sm"
                fontSize="xl"
                variant="outline"
                icon={<BsDiscord />}
              />
            </Link>

            <Link
              href="https://nftcalendar.io/event/axoswap-announces-release-of-collection-featuring-3333-axolotl-nfts-with-unique-traits"
              isExternal
            >
              <Box w={30} h={30} rounded="md" overflow="hidden">
                <Image alt="nft calendar" src="/images/nftcalendar-logo.png" />
              </Box>
            </Link>
          </HStack>
        </VStack>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          gap={5}
          flex={1}
          justify="space-between"
          align="flex-start"
        >
          <VStack align="stretch">
            <ListHeader>Products</ListHeader>
            <NextLink href="/app/swap">
              <Link>Swap</Link>
            </NextLink>
            <NextLink href="/app/swap">
              <Link>Limit Order</Link>
            </NextLink>
          </VStack>

          <VStack align="stretch">
            <ListHeader>Support</ListHeader>
            <Link href="https://docs.axoswap.io" isExternal>
              Documentation
            </Link>
            <Link href="https://discord.gg/PJr44AxWAt" isExternal>
              Discord
            </Link>
          </VStack>

          <VStack align="stretch">
            <ListHeader>Protocol</ListHeader>
            <NextLink href="/app/liquid/add-liquidity">
              <Link>Create a Pair</Link>
            </NextLink>
          </VStack>
        </Stack>
      </Stack>

      <Divider />
      <Stack
        gap={1}
        direction={{ base: 'column', md: 'row' }}
        w="full"
        justify="space-between"
        align="center"
      >
        <Text fontSize={{ base: 'sm', sm: 'md' }} textAlign="center">
          © {new Date().getFullYear()} Axoswap. All rights reserved
        </Text>
        <AmplifyBadge />
      </Stack>
    </VStack>
  )
}

const ListHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text textTransform="uppercase" fontWeight="bold" fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

export default Footer
