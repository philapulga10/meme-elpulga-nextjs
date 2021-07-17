import { useEffect } from 'react';
import { useRouter } from 'next/router';

const SearchPage = () => {
  const router = useRouter();
  const searchStr = router.query.q || '';

  useEffect(() => {
    if (!searchStr) {
      router.push('/');
    };
  }, [searchStr]);

  return (
    <h1>Search Page</h1>
  );
};

export default SearchPage;
