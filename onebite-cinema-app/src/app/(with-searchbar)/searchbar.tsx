'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

export default function Searchbar() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  useEffect(() => {
    const q = searchParams.get('q');
    if (!q) {
      return;
    }
    setSearch(q);
  }, []);

  const onSubmit = () => {
    if (!search) {
      return;
    }
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <input
        value={search}
        onChange={onChangeValue}
        onKeyDown={onKeyDown}
        placeholder="검색어를 입력하세요.."
      />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
