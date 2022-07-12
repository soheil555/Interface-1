import { Box, Image } from "@chakra-ui/react";

const SideImage = () => {
  return (
    <Box
      display={{ base: "none", lg: "block" }}
      zIndex={1}
      w="8rem"
      h="100vh"
      position="fixed"
      top={0}
    >
      <Image
        w="full"
        h="full"
        objectFit="cover"
        src="/assets/images/vertical.jpg"
      />
    </Box>
  );
};

export default SideImage;
