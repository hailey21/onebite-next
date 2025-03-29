import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import movies from '@/mock/movies.json';
import MovieItem from '@/components/movie-item';

export default function Home() {
  return (
    <div>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        {movies.slice(0, 3).map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        {movies.slice(0, 5).map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
