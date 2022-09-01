import { Flex, Button, Text, VStack, Stack, Link } from "@chakra-ui/react";

export default function Protocol() {
  return (
    <Flex
      w="full"
      h="50rem"
      backgroundImage="/images/hero.gif"
      backgroundSize="cover"
      backgroundPosition="center"
      my={5}
      rounded="lg"
    >
      <VStack spacing={6} w="full" justify="center" px={{ base: 4, md: 8 }}>
        <Text
          textAlign="center"
          color="white"
          fontWeight={700}
          lineHeight={1.2}
          fontSize={{ base: "3xl", md: "4xl" }}
        >
          Defi's most cutting edge protocol!
        </Text>
        <Stack
          direction={{ base: "column", md: "row" }}
          w={{ base: "60%", md: "full" }}
          justify="center"
          align="center"
        >
          <Link href="https://docs.axoswap.io" isExternal>
            <Button variant="brand">View our docs</Button>
          </Link>
          <Link href="#">
            <Button variant="brand-2-outline">Buy AxO Token</Button>
          </Link>
        </Stack>
      </VStack>
    </Flex>
  );
}
