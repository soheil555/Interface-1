import { ComponentStyleConfig } from "@chakra-ui/react";

const Button: ComponentStyleConfig = {
  variants: {
    brand: {
      bg: "brand.gradient",
      color: "white",
      rounded: "full",
    },
    "brand-outline": {
      bg: "white",
      color: "brand.300",
      rounded: "full",
    },
  },
};

export default Button;
