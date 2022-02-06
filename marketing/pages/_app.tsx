import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"`,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <>
        <Head>
          <title>Bank of Things – Token gated access to Notion</title>
          <meta
            name="description"
            content="Access Notion, Web2 domains, Twitter, and Discord via NFT or DAO token"
          ></meta>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="icon"
            type="image/png"
            href="https://api.typedream.com/v0/document/public/dd596406-303e-4f2c-b330-3e3e64a5922e_favicon-32x32_png.png"
          />
          <link
            rel="apple-touch-icon"
            href="https://api.typedream.com/v0/document/public/dd596406-303e-4f2c-b330-3e3e64a5922e_favicon-32x32_png.png"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Bank of Things – Token gated access to Notion"
          />
          <meta
            property="og:description"
            content="Access Notion, Web2 domains, Twitter, and Discord via NFT or DAO token"
          />
          <meta property="og:site_name" content="Bank of Things" />
          <meta
            name="twitter:title"
            content="Bank of Things – Token gated access to Notion"
          />
          <meta
            name="twitter:description"
            content="Access Notion, Web2 domains, Twitter, and Discord via NFT or DAO token"
          />
          <meta property="og:url" content="https://www.bankofthings.com/" />
        </Head>
        <Component {...pageProps} />
      </>
    </ChakraProvider>
  );
}

export default MyApp;
