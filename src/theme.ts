import {
  extendTheme,
  ThemeConfig,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { StyleConfig, mode } from "@chakra-ui/theme-tools";

const components: Record<string, StyleConfig> = {
  Button: {
    variants: {
      brand: ({ colorMode }) => ({
        bg: "brand.gradient",
        color: "white",
        minW: 200,
        _hover: {
          bg: colorMode === "light" ? "gray.900" : "white",
          color: colorMode === "light" ? "white" : "black",
        },
      }),

      "brand-2": () => ({
        bg: "brand.gradient",
        color: "white",
        minW: 100,
      }),

      "brand-outline": ({ colorMode }) => ({
        minW: 200,
        bg: colorMode === "light" ? "white" : "gray.900",
        position: "relative",

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
          bg: colorMode === "light" ? "gray.900" : "brand.gradient",
          color: "white",
        },
      }),

      "brand-2-outline": ({ colorMode }) => ({
        minW: 200,
        bg: colorMode === "light" ? "white" : "gray.900",
        textTransform: "uppercase",
        border: "solid",
        borderWidth: 2,
        borderImageSlice: 1,
        borderImageSource:
          "linear-gradient(89.83deg, #d065d8 8.99%, #ff60a0 99.84%)",
      }),
    },
  },

  Text: {
    variants: {
      subtext: ({ colorMode }) => ({
        color: colorMode === "light" ? "gray.600" : "gray.300",
      }),
    },
  },

  Menu: {
    variants: {
      primary: ({ colorMode }) => ({
        list: {
          bg: colorMode === "light" ? "white" : "gray.800",
        },
      }),
    },
    defaultProps: {
      variant: "primary",
    },
  },
  Popover: {
    variants: {
      primary: ({ colorMode }) => ({
        content: {
          bg: colorMode === "light" ? "white" : "gray.800",
        },
      }),
    },
    defaultProps: {
      variant: "primary",
    },
  },
  Modal: {
    variants: {
      primary: ({ colorMode }) => ({
        header: {
          bg: colorMode === "light" ? "white" : "gray.800",
        },
        body: {
          bg: colorMode === "light" ? "white" : "gray.800",
        },
      }),
    },
    defaultProps: {
      variant: "primary",
    },
  },
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme(
  {
    config,

    styles: {
      global: (props: any) => ({
        body: {
          bg: mode("white", "black")(props),
        },
      }),
    },

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
  },
  withDefaultColorScheme({
    colorScheme: "brand",
    components: ["Button", "Tabs", "Checkbox", "Slider", "Switch"],
  })
);

export default theme;
