import { Flex, Link, Image, HStack, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { appRoutes } from "../../../routes";
import MetaMaskConnect from "../../app/Web3/MetaMaskConnect";
import Settings from "../../app/Settings";

const AppHeader = () => {
  const router = useRouter();

  return (
    <Flex
      gap={2}
      position="sticky"
      marginLeft="auto"
      top={0}
      zIndex={1}
      w={{ base: "full", lg: "calc(100vw - 8rem)" }}
      justify="space-between"
      align="center"
      p={5}
      bg={useColorModeValue("gray.50", "gray.700")}
      boxShadow="sm"
    >
      {
        <HStack gap={10}>
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
                <NextLink key={route.label} href={route.href} passHref>
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
        <Settings />
        <MetaMaskConnect />
      </HStack>
    </Flex>
  );
};

export default AppHeader;
