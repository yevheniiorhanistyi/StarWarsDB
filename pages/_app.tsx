/* eslint-disable react/jsx-props-no-spreading */
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { wrapper } from "redux/store";

import { ICharData, IResourceResponse } from "types/types";
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary";

import "normalize.css";
import "../scss/index.scss";

type CustomPageProps = {
  pageProps: {
    data: IResourceResponse;
    item: ICharData;
  };
};

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props as CustomPageProps;

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
