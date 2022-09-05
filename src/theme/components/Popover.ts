import { ComponentStyleConfig } from "@chakra-ui/react";

const Popover: ComponentStyleConfig = {
  baseStyle: ({ colorMode }) => ({
    content: {
      bg: colorMode === "light" ? "white" : "gray.800",
    },
  }),
};

export default Popover;
