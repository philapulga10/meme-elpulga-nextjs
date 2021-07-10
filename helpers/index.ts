import { NextPageContext } from 'next';

import atob from 'atob';
import cookie from 'cookie';
import Cookies from 'js-cookie';

type UserToken = {
  id: string,
  email: string
};

export const parseJwt = (token: string) => {
  try {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

// tại sao ở đây ctx lại có thể truyền hoặc không cần truyền vào => vì sau này có thể thực hiện nhiều nơi => không cần truyền ctx cũng được
export const getTokenSSRAndCSS = (ctx?: NextPageContext): [string, UserToken | null] => {
  let token = '';
  let userToken = null;

  if (typeof (window) === "undefined") {
    // SSR
    const cookieStr = ctx?.req?.headers?.cookie || ''; // cookie này chứa tất cả cookie của trình duyệt
    token = cookie.parse(cookieStr).token; // parse string ra object
    userToken = parseJwt(token);
  } else {
    // CSR
    token = Cookies.get('token') || '';
  }

  return [token, userToken];
};
