import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode("white", "black")(props),
        overflowY: "scroll", // Always show scrollbar to avoid flickering
      },
    }),
  },
  fonts: {
    body: "Inter, system-ui, sans-serif",
    heading: "Work Sans, system-ui, sans-serif",
  },
  colors: {
    brand: {
      "50": "#F9EBF8",
      "100": "#F0C7EC",
      "200": "#E6A3E0",
      "300": "#DC7FD3",
      "400": "#D25BC7",
      "500": "#C837BB",
      "600": "#A02C95",
      "700": "#782170",
      "800": "#50164B",
      "900": "#280B25",
      gradient: "linear-gradient(94.65deg, #e16adc, #ed8780)",
    },
  },
};
