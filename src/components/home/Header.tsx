import {
  Flex,
  Image,
  HStack,
  Link,
  Button,
  useDisclosure,
  Icon,
  IconButton,
  Container,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import ThemeToggler from '../common/ThemeToggler'
import { homeRoutes } from '../../routes'
import SideDrawer from './SideDrawer'
import { HamburgerIcon } from '@chakra-ui/icons'

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Container maxW="container.xl" minH="20vh">
      <Flex h="full" justify="space-between" align="center" py={10}>
        <NextLink href="/" passHref>
          <Link>
            <Image
              alt="logo"
              width={{ base: 50, sm: 70 }}
              src="/images/logo@2x.png"
            />
          </Link>
        </NextLink>

        <HStack
          justify="flex-end"
          w={650}
          display={{ base: 'none', lg: 'flex' }}
          fontSize={22}
          gap={16}
          mx={10}
          color="white"
        >
          {getLinks()}
        </HStack>

        <HStack gap={2}>
          <ThemeToggler />

          <NextLink href="/app/swap">
            <Button
              borderRadius="lg"
              variant="brand-solid"
              rounded="full"
              px={10}
              display={{ base: 'none', lg: 'block' }}
            >
              Launch App
            </Button>
          </NextLink>

          <IconButton
            fontSize="2xl"
            variant="unstyled"
            color="white"
            aria-label="hamburger"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            display={{ lg: 'none' }}
          />
        </HStack>
      </Flex>

      <SideDrawer isOpen={isOpen} onClose={onClose} />
    </Container>
  )
}

export const getLinks = () => {
  return homeRoutes.map((route) => {
    return (
      <NextLink href={route.href} key={route.label} passHref>
        <Link isExternal={route.isExternal}>
          {route.icon ? (
            <HStack gap={1}>
              <Icon as={route.icon} />
              <>{route.label}</>
            </HStack>
          ) : (
            route.label
          )}
        </Link>
      </NextLink>
    )
  })
}

export default Header
