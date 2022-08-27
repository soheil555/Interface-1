import { Text, Box, Image, Stack, Button, Link } from "@chakra-ui/react";

const Protocol = () => {
  return (
    <Box>
      <Stack
        gap={2}
        justify="center"
        direction={{ base: "column", md: "row" }}
        py={20}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Text
            textAlign="center"
            mt={6}
            mb={8}
            fontSize={{ base: "lg", md: "3xl" }}
            variant="subtext"
            w={{ base: "100%", md: "80%" }}
          >
            Swap tokens, farm liquidity and explore DeFi cutting-edge
            technology.
          </Text>
          <Text mb={4} fontSize="xl">
            Need helps?
          </Text>
          <Link href="https://docs.axoswap.io">
            <Button variant="brand-outline">View our docs</Button>
          </Link>
          <Text fontSize="lg">Or</Text>
          <Link href="#">
            <Button variant="brand-outline">Watch our video</Button>
          </Link>
        </Box>

        <Image
          alignSelf="center"
          w={{ base: 300, md: 200, lg: 400 }}
          src="/images/protocol-img1.png"
        />
      </Stack>
    </Box>
  );
};
export default Protocol;
