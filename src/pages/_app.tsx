import { useEffect, useState } from "react";

import NextProgress from "next-progress";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Disclaimer from "@components/Disclaimer";
import GlobalStyle from "@components/GlobalStyle";
import color from "@constants/color";
import configureStore from "@redux/configureStore";

const App = ({ Component, pageProps }: AppProps) => {
  const [showChild, setShowChild] = useState(false);

  const { store, persistor } = configureStore;

  useEffect(() => {
    setShowChild(true);
  }, []);

  return typeof window === "undefined" || !showChild ? null : (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextProgress color={color.progress} options={{ showSpinner: false }} />
        <GlobalStyle />
        <Component {...pageProps} />
        <Disclaimer />
      </PersistGate>
    </Provider>
  );
};

export default App;
