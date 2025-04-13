import MovieItem from '@/components/movie-item';
import style from './page.module.css';
import { MovieData } from '@/types';
import { Suspense } from 'react';
import { delay } from '@/util/delay';
import MovieItemSkeleton from '@/components/skeleton/movie-item-skeleton';
import MovieListSkeleton from '@/components/skeleton/movie-list-skeleton';

async function AllMovies() {
  await delay(3000);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/movie`, {
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!response.ok) {
    return <div>오류가 발생했습니다..</div>;
  }

  const allMovies: MovieData[] = await response.json();

  return (
    <div className={style.all_container}>
      {allMovies.map((movie) => (
        <MovieItem key={`all-${movie.id}`} {...movie} />
      ))}
    </div>
  );
}

async function RecommandMovies() {
  await delay(1500);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/movie/random`, {
    next: { revalidate: 3 },
  });
  if (!response) {
    return <div>오류가 발생했습니다..</div>;
  }

  const recoMovies: MovieData[] = await response.json();
  return (
    <div className={style.reco_conatiner}>
      {recoMovies.slice(0, 3).map((movie) => (
        <MovieItem key={`reco-${movie.id}`} {...movie} />
      ))}
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className={style.conatiner}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <Suspense fallback={<MovieListSkeleton col={3} count={3} />}>
          <RecommandMovies />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <Suspense fallback={<MovieListSkeleton col={5} count={15} />}>
          <AllMovies />
        </Suspense>
      </section>
    </div>
  );
}
