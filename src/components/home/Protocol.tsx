import { Box, Button, Text, VStack, Image, Stack } from "@chakra-ui/react";

export default function Protocol() {
  return (
    <VStack justify="flex-start" gap={{ base: 10, lg: 40 }}>
      <Box
        w="50%"
        position="absolute"
        zIndex={100}
        bottom={0}
        right={0}
        display={{ base: "none", lg: "block" }}
      >
        <Image
          w="full"
          h="full"
          objectFit="contain"
          src="/images/bg-protocol-right-desktop.png"
        />
      </Box>

      <Text
        textAlign="center"
        fontWeight="bold"
        fontSize={{ base: "2xl", lg: "3xl" }}
      >
        Swap tokens, farm liquidity and
        <br /> explore DeFi cutting-edge technology.
      </Text>

      <VStack alignSelf={{ base: "center", lg: "flex-start" }} w="47%">
        <Text mb={3}>Need Help?</Text>
        <Stack align="center" direction={{ base: "row", lg: "column" }}>
          <Button
            variant="brand"
            rounded="full"
            w={{ base: "10rem", md: "15rem" }}
          >
            View our Docs
          </Button>
          <Text>Or</Text>
          <Button
            variant="brand"
            rounded="full"
            w={{ base: "10rem", md: "15rem" }}
          >
            Watch our Video
          </Button>
        </Stack>
      </VStack>
    </VStack>
  );
}
