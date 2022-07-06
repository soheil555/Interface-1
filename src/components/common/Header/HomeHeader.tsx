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
import ThemeToggler from "../ThemeToggler";
import { Fade as Hamburger } from "hamburger-react";
import { homeRoutes } from "../../../routes";

const HomeHeader = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex justify="space-between" align="center" py={10}>
        <NextLink href="/" passHref>
          <Link>
            <Image
              width={{ base: 50, sm: 70, md: 100 }}
              src="/assets/images/logo@2x.png"
            />
          </Link>
        </NextLink>

        <HStack
          w={600}
          display={{ base: "none", lg: "flex" }}
          fontSize={22}
          gap={4}
          mx={10}
        >
          {getLinks()}
        </HStack>

        <HStack gap={2}>
          <NextLink href="/app/swap">
            <Button
              borderRadius="lg"
              variant="brand"
              display={{ base: "none", lg: "block" }}
            >
              Launch App
            </Button>
          </NextLink>
          <ThemeToggler />

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
        <Link _hover={{ color: "brand.300" }} isExternal={route.isExternal}>
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

export default HomeHeader;
