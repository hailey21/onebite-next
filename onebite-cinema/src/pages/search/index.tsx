import SearchableLayout from '@/components/searchable-layout';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import movies from '@/mock/movies.json';
import MovieItem from '@/components/movie-item';

export default function Page() {
  const router = useRouter();

  const { q } = router.query;

  const result =
    typeof q === 'string'
      ? movies.filter((movie) => movie.title.toLowerCase().includes(q.toLowerCase()))
      : [];

  return result.map((r) => <MovieItem key={r.id} {...r} />);
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
