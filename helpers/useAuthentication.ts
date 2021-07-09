import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { parseJwt } from '../helpers';
import { useRouter } from 'next/router';

function useAuthentication() {
  const router = useRouter();
  const token = Cookies.get('token');

  useEffect(() => {
    const userToken = parseJwt(token);

    if (!(userToken && userToken.id && userToken.email)) {
      router.push('/');
    }
  }, [token]);
}

function useNotAuthenticated() {
  const router = useRouter();
  const token = Cookies.get('token');

  useEffect(() => {
    const userToken = parseJwt(token);

    if (userToken && userToken.id && userToken.email) {
      router.push('/');
    }
  }, [token]);
}

export { useAuthentication, useNotAuthenticated };
