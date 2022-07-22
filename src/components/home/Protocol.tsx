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
          <Heading textAlign="center" mb={4} size="xl">
            AXOSWAP
          </Heading>
          <Heading textAlign="center" fontWeight="light" size="lg">
            PROJECT
          </Heading>
          <Text
            textAlign="center"
            mt={6}
            mb={8}
            fontSize={{ base: "lg", md: "xl" }}
            variant="gray"
            w={{ base: "100%", md: "80%" }}
          >
            All in one decentralized exchange for leveraging diversified funds across Polygon Network.
          </Text>
          <Link href="https://docs.axoswap.io" isExternal>
            <Button variant="brand-outline">View our docs</Button>
          </Link>
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
          <Heading textAlign="center" mb={5} size="xl">
            Crowdfunding Campaign
          </Heading>
          <Heading textAlign="center" fontWeight="light" size="lg">
            AxoGenesis Collection
          </Heading>
          <Text
            textAlign="center"
            my={8}
            variant="gray"
            fontSize={{ base: "lg", md: "xl" }}
            w={["100%", "80%", "60%"]}
          >
            Purchase our crowdfunding NFT collection to support our platform
            development and receive future rewards!
          </Text>

          <Link
            href="https://nftcalendar.io/event/axoswap-announces-release-of-collection-featuring-3333-axolotl-nfts-with-unique-traits/"
            isExternal
          >
            <Button variant="brand-outline" mb={3}>
              Announcement
            </Button>
          </Link>

          <Link href="https://nft.axoswap.io" isExternal>
            <Button variant="brand-outline">Mint Now</Button>
          </Link>
        </Flex>
      </Stack>
    </Box>
  );
};
export default Protocol;
