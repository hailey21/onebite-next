import SearchableLayout from '@/components/searchable-layout';
import { ReactNode, useEffect, useState } from 'react';
import MovieItem from '@/components/movie-item';
import style from './index.module.css';
import fetchMovies from '@/lib/fetch-movies';
import { useRouter } from 'next/router';
import { MovieData } from '@/types';

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const q = context.query.q;
//   const movies = await fetchMovies(q as string);

//   if (!movies) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       movies,
//     },
//   };
// };

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);

  const router = useRouter();
  const q = router.query.q;
  const searchResult = async () => {
    const movies = await fetchMovies(q as string);
    setMovies(movies);
  };

  useEffect(() => {
    if (q) {
      searchResult();
    }
  }, [q]);

  return (
    <div className={style.search_movie}>
      {movies.map((r) => (
        <MovieItem key={r.id} {...r} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
