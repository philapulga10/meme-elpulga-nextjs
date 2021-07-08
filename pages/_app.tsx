import "bootstrap/dist/css/bootstrap.min.css"; // là lúc sử dụng withCSS, vì muốn import CSS bên ngoài vào
import '../assets/css/style.css';

import { useEffect, useMemo } from 'react';

import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';

import es6Promise from 'es6-promise'; // nhờ có es6Promise => có thể .then sau fetch
import cookie from 'cookie';

import { Header } from './../components/Header';
import { Footer } from "../components/Footer";
import { parseJwt } from "../helpers";
import userService from '../services/UserService';

es6Promise.polyfill();

function MyApp({ Component, pageProps, router }: AppProps) {
  const pathname = router.pathname;

  useEffect(() => {
    console.log('pageProps = ', pageProps.userInfo);
  });

  const hiddenFooter = useMemo(() => {
    const excluded = ['/', '/posts/[postId]'];

    return (excluded.indexOf(pathname) !== -1);
  }, [pathname]); // chú ý: địa chỉ của router props không thay đổi, chỉ thay đổi nội dung bên trong thui

  const hiddenHeader = useMemo(() => {
    const exluded = ['/login', '/register'];

    return (exluded.indexOf(pathname) !== -1);
  }, [pathname]);

  return (
    <div id="root">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
        <meta name="keywords" content="HTML5 Template" />
        <meta name="description" content="Cộng đồng chế ảnh Elpulga" />
        <meta name="author" content="etheme.com" />
        <link rel="icon" href="/favicon.ico" />
        <title>Cộng đồng chế ảnh Elpulga</title>

        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" />
        {/* icon */}
        {/* Font Awesome */}
        <link rel="stylesheet" href="/fonts/font-awesome/css/font-awesome.css" />
        <link rel="stylesheet" href="/fonts/emotion/style.css" />

        {/* JAVA SCRIPT */}
        {/* require */}
        {/*  */}
        {/* HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries */}
        {/*[if lt IE 9]>

        <![endif]*/}
      </Head>
      {!hiddenHeader && <Header />}
      <main>
        <Component {...pageProps} />
      </main>
      {!hiddenFooter && <Footer />}
    </div>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const cookieStr = appContext.ctx.req.headers.cookie || ''; // cookie này chứa tất cả cookie của trình duyệt
  const token = cookie.parse(cookieStr).token; // parse string ra object
  const userToken = parseJwt(token);
  let userResponse = null;

  if (userToken && userToken.id) {
    userResponse = await userService.getUserById(userToken.id);

    console.log('userResponse = ', userResponse);
  }

  return {
    pageProps: {
      ...appProps.pageProps, // copy toàn bộ pageProps cũ và pageProps từ page khác truyền vào
      userInfo: userResponse && userResponse.user
    }
  };
}

export default MyApp;
