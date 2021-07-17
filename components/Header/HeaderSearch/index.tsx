import { useState } from "react";

import { useRouter } from 'next/router';

export default function HeaderSearch() {
  const [queryStr, setQueryStr] = useState('');
  const router = useRouter();

  function handleChange(event) {
    setQueryStr(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (queryStr) {
      router.push(`/search?q=${queryStr}`);
    }
  };

  return (
    <div className="ass1-header__search">
      <form onSubmit={handleSubmit} action="#">
        <label>
          <input
            onChange={handleChange}
            type="search"
            value={queryStr}
            className="form-control"
            placeholder="Nhập từ khóa ..."
          />
          <i className="icon-Search"></i>
        </label>
      </form>
    </div>
  );
};
