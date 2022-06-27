import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import Tab from "./Tab";
import { appRoutes } from "../../routes";

const Tabs = () => {
  return (
    <Box
      display={{ base: "block", lg: "none" }}
      position="fixed"
      left={0}
      bottom={0}
      w="100%"
      p={5}
      borderTop="solid"
      borderTopWidth={1}
      borderColor="gray.400"
      zIndex={1}
      bg={useColorModeValue("gray.50", "gray.700")}
    >
      <HStack justify="center" gap={10}>
        {appRoutes.map((route) => (
          <Tab href={route.href} label={route.label} icon={route.icon} />
        ))}
      </HStack>
    </Box>
  );
};

export default Tabs;
