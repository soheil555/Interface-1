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
           Swap tokens, farm liquidity and explore DeFi's latest protocols!
          </Text>
          <Link href="https://docs.axoswap.io" isExternal>
            <Button variant="brand-outline">View our docs</Button>
          </Link>
          <Text fontSize="s">Coming soon! </Text>
          <Text>Platform content breakdown with DeFi's first V-Tuber!</Text>
        </Box>

        <Image
          alignSelf="center"
          w={{ base: 500, md: 400, lg: 600 }}
          src="/images/protocol-img1.png"
        />
      </Stack>

      <Stack
        gap={2}
        justify="center"
        direction={{ base: "column", md: "row" }}
        pt={15}
        pb={20}
      >
        <Box alignSelf="center">
          <NextLink href="https://rarible.com/axoswapio" passHref>
            <Link isExternal>
              <Image w={{ base: 500, md: 700 }} src="/images/nftImg.gif" />
            </Link>
          </NextLink>
        </Box>

        <Flex direction="column" align="center" pt={10}>
          <Heading textAlign="center" fontWeight="light" size="lg">
            Axoswap's Official NFT Collection!
          </Heading>
          <Text
            textAlign="center"
            my={8}
            variant="subtext"
            fontSize={{ base: "lg", md: "xl" }}
            w={["100%", "80%", "60%"]}
          >
          </Text>
          <Link href="https://nft.axoswap.io" isExternal>
            <Button variant="brand-outline">Mint Now</Button>
          </Link>
        </Flex>
      </Stack>
    </Box>
  );
};
export default Protocol;
