import React, { ReactNode, useEffect, useState } from 'react';
import style from './searchable-layout.module.css';
import { useRouter } from 'next/router';

export default function SearchableLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const q = router.query.q as string;

  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const onChangeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input onKeyDown={onKeyDown} value={search} onChange={onChangeState} placeholder="검색어를 입력하세요 ..." />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
