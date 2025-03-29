import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import movies from '@/mock/movies.json';
import MovieItem from '@/components/movie-item';

export default function Home() {
  return (
    <div className="container">
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className="recommend-movie">
          {movies.slice(0, 3).map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className="all-movie">
          {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
