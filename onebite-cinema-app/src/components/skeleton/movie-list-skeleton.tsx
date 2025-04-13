import MovieItemSkeleton from './movie-item-skeleton';

export default function MovieListSkeleton({ col, count }: { col: number; count: number }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${col}, 1fr)`,
        gap: '5px',
      }}
    >
      {new Array(count).fill(0).map((_, idx) => (
        <MovieItemSkeleton key={`movie-item-${idx}`} />
      ))}
    </div>
  );
}
