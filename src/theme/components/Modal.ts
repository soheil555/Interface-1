import { ComponentStyleConfig } from "@chakra-ui/react";

const Modal: ComponentStyleConfig = {
  baseStyle: ({ colorMode }) => ({
    header: {
      bg: colorMode === "light" ? "white" : "gray.800",
    },
    body: {
      bg: colorMode === "light" ? "white" : "gray.800",
    },
  }),
};

export default Modal;
