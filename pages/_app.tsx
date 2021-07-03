import { useEffect } from 'react';
import App, { AppContext, AppProps } from 'next/app';

import { Header } from './../components/Header';

import '../styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    console.log('pageProps = ', pageProps);
    console.log('router = ', router);
  });

  return (
    <div id="root">
      <Header />
      <Component {...pageProps} />
    </div>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  console.log('appProps: ', appProps);

  return {
    pageProps: {
      // copy toàn bộ pageProps cũ và pageProps từ page khác truyền vào
      ...appProps.pageProps
    }
  };
}

export default MyApp;
