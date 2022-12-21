import { useEffect, useState } from "react";

import NextProgress from "next-progress";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import GlobalStyle from "@components/GlobalStyle";
import color from "@constants/color";
import store, { persistor } from "src/redux/store";

const App = ({ Component, pageProps }: AppProps) => {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  return typeof window === "undefined" || !showChild ? null : (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NextProgress color={color.progress} options={{ showSpinner: false }} />
        <GlobalStyle />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default App;
