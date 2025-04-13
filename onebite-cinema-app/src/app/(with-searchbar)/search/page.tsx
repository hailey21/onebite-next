import MovieItem from '@/components/movie-item';
import style from './page.module.css';
import { MovieData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense, useEffect } from 'react';
import MovieListSkeleton from '@/components/skeleton/movie-list-skeleton';

async function SearchResult({ q }: { q: string }) {
  await delay(1500);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/movie/search?q=${q}`, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    return <div>오류가 발생했습니다..</div>;
  }

  const movies: MovieData[] = await response.json();

  return (
    <div className={style.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return (
    <Suspense key={(await searchParams).q || ''} fallback={<MovieListSkeleton col={3} count={3} />}>
      <SearchResult q={(await searchParams).q || ''} />
    </Suspense>
  );
}
