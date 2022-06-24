import {
  Text,
  Box,
  Heading,
  Image,
  Stack,
  Button,
  Flex,
} from "@chakra-ui/react";

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
          <Heading mb={4} size="xl">
            AXOSWAP
          </Heading>
          <Heading fontWeight="light" size="lg">
            Disclaimer
          </Heading>
          <Text
            w="80%"
            textAlign="center"
            mt={6}
            mb={8}
            color="gray.600"
            fontSize="lg"
          >
            WORK IN PROGRESS: What you are seeing isn't a final product.
          </Text>
          <Button>View our docs</Button>
        </Box>

        <Image
          alignSelf="center"
          w={{ base: 500, md: 400, lg: 600 }}
          src="/assets/images/protocol-img1.png"
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
          <Image w={{ base: 500, md: 700 }} src="/assets/images/nftImg.gif" />
        </Box>

        <Flex direction="column" align="center" pt={10}>
          <Heading textAlign="center" mb={5} size="xl">
            Crowdfunding Campaign
          </Heading>
          <Heading fontWeight="light" size="lg">
            AxoGenesis Collection
          </Heading>
          <Text textAlign="center" my={8} color="gray.600" fontSize="xl">
            Purchase our crowdfunding NFT collection to support our platform
            development and receive future rewards!
          </Text>
          <Button mb={2}>Announcement</Button>
          <Button>Mint Now</Button>
        </Flex>
      </Stack>
    </Box>
  );
};
export default Protocol;
