import { useEffect, useState } from "react";

import type { AppProps } from "next/app";

import GlobalStyle from "@components/GlobalStyle";

const App = ({ Component, pageProps }: AppProps) => {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  return typeof window === "undefined" || !showChild ? null : (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default App;
