import { useEffect, useState } from "react";

import NextProgress from "next-progress";
import type { AppProps } from "next/app";

import GlobalStyle from "@components/GlobalStyle";
import color from "@constants/color";

const App = ({ Component, pageProps }: AppProps) => {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  return typeof window === "undefined" || !showChild ? null : (
    <>
      <NextProgress color={color.progress} options={{ showSpinner: false }} />
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default App;
