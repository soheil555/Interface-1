import {
  Flex,
  Link,
  HStack,
  useColorModeValue,
  Image,
  Box,
  Center,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { appRoutes } from '../../../routes'
import MetaMaskConnect from '../../app/Web3/MetaMaskConnect'
import Settings from '../../app/Settings/Settings'
import SideDrawer from '../SideDrawer/SideDrawer'

const Header = () => {
  const router = useRouter()

  return (
    <Flex
      gap={2}
      position="sticky"
      marginLeft="auto"
      top={0}
      zIndex={1}
      justify="space-between"
      align="center"
      p={5}
      bg={useColorModeValue('gray.50', 'gray.900')}
      boxShadow="sm"
    >
      <SideDrawer />

      <HStack gap={10}>
        <Center
          w={{ base: '2rem', md: '3rem' }}
          h={{ base: '2rem', md: '3rem' }}
        >
          <Image alt="logo" src="/images/logo@2x.png" />
        </Center>
        <HStack
          display={{ base: 'none', lg: 'flex' }}
          fontSize={22}
          gap={10}
          mx={10}
          justify="center"
        >
          {appRoutes.map((route) => {
            const isActive = router.pathname.startsWith(route.href)

            return (
              <NextLink key={route.label} href={route.href} passHref>
                <Link color={isActive ? 'brand.300' : undefined}>
                  {route.label}
                </Link>
              </NextLink>
            )
          })}
        </HStack>
      </HStack>

      <HStack gap={2}>
        <Settings />
        <Box display={{ base: 'none', lg: 'block' }}>
          <MetaMaskConnect />
        </Box>
      </HStack>
    </Flex>
  )
}

export default Header
