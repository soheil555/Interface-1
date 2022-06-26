import { Box, HStack } from "@chakra-ui/react";
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
