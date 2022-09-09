import { ComponentStyleConfig } from "@chakra-ui/react";

const Menu: ComponentStyleConfig = {
  baseStyle: ({ colorMode }) => ({
    list: {
      bg: colorMode === "light" ? "white" : "gray.800",
    },
  }),
};

export default Menu;
