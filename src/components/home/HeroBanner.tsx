import {
  Heading,
  Text,
  Box,
  Image,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";
import Counter from "./Counter";

const HeroBanner = () => {
  return (
    <HStack pt={10} pb={16} justify="space-between" align="flex-start">
      <Box position="absolute" zIndex={-100} top={0} left={0} w="full">
        <Image
          w="full"
          h="full"
          objectFit="cover"
          src="/images/bg-hero-top-desktop.png"
        />
      </Box>

      <VStack align="flex-start">
        <Box py={24}>
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
          <Button variant="brand" w="15rem">
            Join Event
          </Button>
        </VStack>
      </VStack>

      <Box>
        <Image src="/images/hero-img.png" />
      </Box>
    </HStack>
  );
};
export default HeroBanner;
