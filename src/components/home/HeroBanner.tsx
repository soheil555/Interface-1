import { Flex, Heading, Text } from "@chakra-ui/react";

const HeroBanner = () => {
  return (
    <Flex
      flexDir="column"
      gap={10}
      pt={{ base: 10, md: 15, lg: 20 }}
      pb={16}
      align="center"
      justify="center"
    >
      <Heading
        textAlign="center"
        fontSize={{ base: "4xl", sm: "6xl", md: "8xl", lg: "9xl" }}
        lineHeight="1"
        fontWeight="black"
      >
        AXOSWAP <Text color="brand.300">PROTOCOL</Text>
      </Heading>
      <Text textAlign="center" fontSize="3xl">
        ICO sale starts on 15/07/2022
      </Text>
    </Flex>
  );
};
export default HeroBanner;
