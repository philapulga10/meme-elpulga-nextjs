import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { parseJwt } from '.';
import { useGlobalState } from '../state';

function useAuthen() {
  const router = useRouter();
  const [token] = useGlobalState('token');

  useEffect(() => {
    const userToken = parseJwt(token);

    if (!(userToken && userToken.id && userToken.email)) {
      router.push('/login');
    }
  }, [token]);
}

function useNotAuthen() {
  const router = useRouter();
  const [token] = useGlobalState('token');

  useEffect(() => {
    const userToken = parseJwt(token);

    if (userToken && userToken.id && userToken.email) {
      router.push('/');
    }
  }, [token]);
}

export { useAuthen, useNotAuthen };
