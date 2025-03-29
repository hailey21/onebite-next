import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import MovieItem from '@/components/movie-item';
import style from './index.module.css';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchMovies from '@/lib/fetch-movies';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const q = context.query.q;
  const movies = await fetchMovies(q as string);

  return {
    props: {
      movies,
    },
  };
};

export default function Page({ movies }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
