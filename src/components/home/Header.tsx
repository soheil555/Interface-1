import {
  Box,
  Flex,
  Image,
  HStack,
  Link,
  Center,
  Button,
  useDisclosure,
  Collapse,
  VStack,
  Icon,
} from "@chakra-ui/react";
import NextLink from "next/link";
import ThemeToggler from "../common/ThemeToggler";
import { Fade as Hamburger } from "hamburger-react";
import { homeRoutes } from "../../routes";

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box h="20vh">
      <Flex h="full" justify="space-between" align="center" py={10}>
        <NextLink href="/" passHref>
          <Link>
            <Image
              width={{ base: 50, sm: 70, md: 100 }}
              src="/images/logo@2x.png"
            />
          </Link>
        </NextLink>

        <HStack
          justify="flex-end"
          w={650}
          display={{ base: "none", lg: "flex" }}
          fontSize={22}
          gap={16}
          mx={10}
        >
          {getLinks()}
        </HStack>

        <HStack gap={2}>
          <ThemeToggler />

          <NextLink href="/app/swap">
            <Button
              borderRadius="lg"
              variant="brand-outline"
              px={10}
              display={{ base: "none", lg: "block" }}
            >
              Launch App
            </Button>
          </NextLink>

          <Box onClick={onToggle} display={{ lg: "none" }}>
            <Hamburger direction="left" />
          </Box>
        </HStack>
      </Flex>

      <Box display={{ lg: "none" }}>
        <Collapse in={isOpen}>
          <VStack fontSize={22} gap={3}>
            {getLinks()}
            <NextLink href="/app/swap">
              <Button borderRadius="lg" variant="brand">
                Launch App
              </Button>
            </NextLink>
          </VStack>
        </Collapse>
      </Box>
    </Box>
  );
};

const getLinks = () => {
  return homeRoutes.map((route) => {
    return (
      <NextLink href={route.href} key={route.label} passHref>
        <Link color="white" isExternal={route.isExternal}>
          {route.icon ? (
            <Center gap={1}>
              <Icon as={route.icon} />
              {route.label}
            </Center>
          ) : (
            route.label
          )}
        </Link>
      </NextLink>
    );
  });
};

export default Header;
