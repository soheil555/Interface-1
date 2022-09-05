import { Box, Button, Text, VStack, Image, Flex } from "@chakra-ui/react";

export default function Protocol() {
  return (
    <VStack justify="flex-start" gap={56}>
      <Box position="absolute" zIndex={100} bottom={0} right={0}>
        <Image
          w="full"
          h="full"
          objectFit="contain"
          src="/images/bg-protocol-right-desktop.png"
        />
      </Box>

      <Text textAlign="center" fontWeight="bold" fontSize="3xl">
        Swap tokens, farm liquidity and
        <br /> explore DeFi cutting-edge technology.
      </Text>

      <VStack alignSelf="flex-start" w="47%">
        <Text mb={3}>Need Help?</Text>
        <Button variant="brand" w="15rem">
          View our Docs
        </Button>
        <Text>Or</Text>
        <Button variant="brand" w="15rem">
          Watch our Video
        </Button>
      </VStack>
    </VStack>
  );
}
