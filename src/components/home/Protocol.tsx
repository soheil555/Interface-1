import {
  Text,
  Box,
  Heading,
  Image,
  Stack,
  Button,
  Flex,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";

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
           Swap tokens, farm liquidity and explore DeFi cutting-edge technology.
          </Text>
          <Text fontSize="xxl">Need helps?</Text>
          <Link href="https://docs.axoswap.io" isExternal>
            <Button variant="brand-outline">View our docs</Button>
          </Link>
          <Text fontSize="l">Or</Text>
          <Button variant="brand-outline">Watch our video</Button>
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
