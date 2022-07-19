import { Box, Image } from "@chakra-ui/react";

const TopImage = () => {
  return (
    <Box w="full" h="3rem" display={{ base: "block", lg: "none" }}>
      <Image w="full" h="full" objectFit="cover" src="/images/horizontal.jpg" />
    </Box>
  );
};

export default TopImage;
