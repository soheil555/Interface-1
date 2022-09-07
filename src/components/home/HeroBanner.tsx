import {
  Heading,
  Text,
  Box,
  Image,
  VStack,
  Button,
  Stack,
} from "@chakra-ui/react";
import Counter from "./Counter";

const HeroBanner = () => {
  return (
    <Stack
      direction={{ base: "column", lg: "row" }}
      pt={{ base: 0, lg: 10 }}
      pb={16}
      gap={20}
      align={{ base: "center", lg: "flex-start" }}
      justify="stretch"
    >
      <Box
        position="absolute"
        zIndex={-100}
        top={0}
        left={0}
        w="full"
        h={{ base: "600px", lg: "720px" }}
      >
        <Image
          w="full"
          h="full"
          objectFit="cover"
          src="/images/bg-hero-top-desktop.png"
        />
      </Box>

      <VStack flex={1} align="flex-start">
        <Box pt={{ base: 2, lg: 24 }} pb={24}>
          <Heading
            mb={1}
            color="white"
            textAlign="center"
            fontSize="7xl"
            lineHeight="1"
          >
            AXOSWAP
          </Heading>
          <Text color="white" fontSize="1.6rem">
            DECENTRALIZED EXCHANGE
          </Text>
        </Box>

        <Counter />

        <VStack pt="3rem" w="full" gap={3}>
          <Text fontSize="lg" textAlign="center">
            Project Status: ICO event live on Sushiswap!
          </Text>
          <Button variant="brand" rounded="full" w="15rem">
            Join Event
          </Button>
        </VStack>
      </VStack>

      <Box flex={1}>
        <Image src="/images/hero-img.png" />
      </Box>
    </Stack>
  );
};
export default HeroBanner;
