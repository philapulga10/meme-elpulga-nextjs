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

export const handleError = (key: string, value: string, password?: string): string => {
  let error = '';

  if (value.trim().length === 0) {
    error = `${key} is required!`;
  }

  switch (key) {
    case 'email':
      if (!validateEmail(value)) {
        error = 'Invalid email';
      }

      break;
    case 'password':
      if (value.length < 6) {
        error = 'Password is too short';
      }

      break;
    case 'repassword':
      if (value !== password) {
        error = 'Re-entered password does not match';
      }

      break;
    default:
      break;
  }

  return error;
};

export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
}