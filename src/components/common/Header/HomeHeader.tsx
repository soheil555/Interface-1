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
} from "@chakra-ui/react";
import NextLink from "next/link";
import { IoLogoGithub } from "react-icons/io5";
import ThemeToggler from "../ThemeToggler";
import { Fade as Hamburger } from "hamburger-react";
import type { IconType } from "react-icons";

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
          <Button
            borderRadius="lg"
            variant="brand"
            display={{ base: "none", lg: "block" }}
          >
            Launch App
          </Button>
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
            <Button borderRadius="lg" variant="brand">
              Launch App
            </Button>
          </VStack>
        </Collapse>
      </Box>
    </Box>
  );
};

interface Link {
  label: string;
  href: string;
  isExternal: boolean;
  icon?: IconType;
}

const links: Link[] = [
  {
    label: "Documentation",
    href: "https://docs.axoswap.io",
    isExternal: true,
  },
  {
    label: "Community",
    href: "#",
    isExternal: true,
  },
  {
    label: "Github",
    href: "https://github.com/Axoswap-Polygon",
    icon: IoLogoGithub,
    isExternal: true,
  },
];

const getLinks = () => {
  return links.map((link) => {
    return (
      <NextLink href={link.href} key={link.label} passHref>
        <Link _hover={{ color: "brand.300" }} isExternal={link.isExternal}>
          {link.icon ? (
            <Center gap={1}>
              <link.icon />
              {link.label}
            </Center>
          ) : (
            link.label
          )}
        </Link>
      </NextLink>
    );
  });
};

export default HomeHeader;
