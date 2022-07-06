import {
  Flex,
  Link,
  Image,
  HStack,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { appRoutes } from "../../../routes";
import MetaMaskConnect from "../../app/Web3/MetaMaskConnect";
import ThemeToggler from "../ThemeToggler";

const AppHeader = () => {
  const router = useRouter();

  return (
    <Flex
      gap={2}
      position="sticky"
      top={0}
      zIndex={1}
      w="100%"
      justify="space-between"
      align="center"
      p={5}
      bg={useColorModeValue("gray.50", "gray.700")}
      boxShadow="sm"
    >
      {
        <HStack gap={10}>
          <NextLink href="/app/swap" passHref>
            <Link>
              <Image width={50} src="/assets/images/logo@2x.png" />
            </Link>
          </NextLink>

          <HStack
            display={{ base: "none", lg: "flex" }}
            fontSize={22}
            gap={10}
            mx={10}
            justify="center"
          >
            {appRoutes.map((route) => {
              const isActive = router.pathname.startsWith(route.href);

              return (
                <NextLink href={route.href} passHref>
                  <Link color={isActive ? "brand.300" : undefined}>
                    {route.label}
                  </Link>
                </NextLink>
              );
            })}
          </HStack>
        </HStack>
      }

      <HStack gap={2}>
        <MetaMaskConnect />
        <ThemeToggler />
      </HStack>
    </Flex>
  );
};

export default AppHeader;
