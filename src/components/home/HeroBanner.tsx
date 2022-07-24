import { Flex, Heading, Text, Link, Button} from "@chakra-ui/react";
import NextLink from "next/link";
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
        AXOSWAP <Text color="brand.300">PROJECT</Text>
      </Heading>
      <Text textAlign="center" fontSize="3xl">
        Project Status: ICO event live on Sushiswap!
      </Text>
      <Link href="https://app.sushi.com/miso/0x697aa88C848599d9F172625D6fA510AB74cb23DA" isExternal>
            <Button variant="brand-outline">Join event</Button>
          </Link>
    </Flex>
  );
};
export default HeroBanner;
