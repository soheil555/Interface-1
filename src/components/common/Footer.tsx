import { HStack, Image, Link, Box, VStack } from "@chakra-ui/react";
import { BsTwitter, BsDiscord } from "react-icons/bs";
const Footer = () => {
  return (
    <VStack align="center" justify="center" p={5} gap={5}>
      <HStack gap={10}>
        <Box fontSize="2xl">
          <Link
            _hover={{
              color: "brand.500",
            }}
            href="https://twitter.com/axoswap"
            isExternal
          >
            <BsTwitter />
          </Link>
        </Box>

        <Box fontSize="2xl">
          <Link
            href="https://nftcalendar.io/event/axoswap-announces-release-of-collection-featuring-3333-axolotl-nfts-with-unique-traits"
            isExternal
          >
            <Image h={30} w={30} src="/assets/images/nftcalendar-logo.png" />
          </Link>
        </Box>

        <Box fontSize="2xl">
          <Link
            _hover={{
              color: "brand.400",
            }}
            href="https://discord.gg/PJr44AxWAt"
            isExternal
          >
            <BsDiscord />
          </Link>
        </Box>
      </HStack>

      <HStack gap={2} textAlign="center" fontSize={{ base: "sm", sm: "md" }}>
        <Link href="https://docs.axoswap.io" isExternal>
          Document
        </Link>

        <Link href="https://github.com/Axoswap-Polygon">Github</Link>

        <Link href="#">Contact Us</Link>
      </HStack>
    </VStack>
  );
};
export default Footer;
