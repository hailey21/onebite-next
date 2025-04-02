import SearchableLayout from '@/components/searchable-layout';
import { ReactNode, useEffect, useState } from 'react';
import MovieItem from '@/components/movie-item';
import style from './index.module.css';
import fetchMovies from '@/lib/fetch-movies';
import { useRouter } from 'next/router';
import { MovieData } from '@/types';
import Head from 'next/head';

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
    <>
      <Head>
        <title>한입시네마 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입시네마 - 검색결과" />
        <meta property="og:description" content="한입 시네마의 영화를 만나보세요." />
      </Head>
      <div className={style.search_movie}>
        {movies.map((r) => (
          <MovieItem key={r.id} {...r} />
        ))}
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
