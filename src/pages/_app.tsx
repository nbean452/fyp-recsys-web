import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Disclaimer from "@components/Disclaimer";
import GlobalStyle from "@components/GlobalStyle";
import configureStore from "@features/configureStore";

const App = ({ Component, pageProps }: AppProps) => {
  const [showChild, setShowChild] = useState<boolean>(false);

  const { store, persistor } = configureStore;

  useEffect(() => {
    setShowChild(true);
  }, []);

  return typeof window === "undefined" || !showChild ? null : (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <Component {...pageProps} />
        <Disclaimer />
      </PersistGate>
    </Provider>
  );
};

export default App;
