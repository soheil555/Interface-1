import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { StyleConfig } from "@chakra-ui/theme-tools";

const components: Record<string, StyleConfig> = {
  Button: {
    variants: {
      brand: ({ colorMode }) => ({
        bg: "brand.gradient",
        color: "white",
        minW: 200,
        _hover: {
          bg: colorMode === "light" ? "black" : "white",
          color: colorMode === "light" ? "white" : "black",
        },
      }),

      "brand-2": () => ({
        bg: "brand.gradient",
        color: "white",
        minW: 200,
      }),

      "brand-outline": ({ colorMode }) => ({
        minW: 200,
        bg: colorMode === "light" ? "white" : "black",
        position: "relative",
        margin: 2,

        _before: {
          borderRadius: "lg",
          content: "''",
          bg: "brand.gradient",
          top: "-0.5",
          left: "-0.5",
          right: "-0.5",
          bottom: "-0.5",
          position: "absolute",
          zIndex: "-1",
        },
        _hover: {
          bg: colorMode === "light" ? "black" : "brand.gradient",
          color: "white",
        },
      }),

      "brand-2-outline": ({ colorMode }) => ({
        minW: 200,
        bg: colorMode === "light" ? "white" : "black",
        position: "relative",
        margin: 2,
        _before: {
          borderRadius: "lg",
          content: "''",
          bg: "brand.gradient",
          top: "-0.5",
          left: "-0.5",
          right: "-0.5",
          bottom: "-0.5",
          position: "absolute",
          zIndex: "-1",
        },
      }),
    },
  },

  Text: {
    variants: {
      gray: ({ colorMode }) => ({
        color: colorMode === "light" ? "gray.600" : "gray.300",
      }),
    },
  },
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,

  fonts: {
    body: "Lato, sans-serif",
    heading: "DM Sans, sans-serif",
  },
  colors: {
    brand: {
      "50": "#FFE5F2",
      "100": "#FFB8DA",
      "200": "#FF8AC2",
      "300": "#FF5CAA",
      "400": "#FF2E92",
      "500": "#FF007A",
      "600": "#CC0062",
      "700": "#990049",
      "800": "#660031",
      "900": "#330018",
      gradient: "linear-gradient(89.83deg, #d065d8 8.99%, #ff60a0 99.84%)",
    },
  },

  components,
});

export default theme;
