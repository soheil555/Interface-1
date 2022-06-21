import type { AppProps } from "next/app";

// Fonts
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";

import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
import "../styles/select2.min.css";
import "../styles/light-style.css";
import "../styles/responsive.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
