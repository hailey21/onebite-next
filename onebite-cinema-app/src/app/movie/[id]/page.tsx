import { notFound } from 'next/navigation';
import style from './page.module.css';
import { MovieData, ReviewData } from '@/types';
import ReviewItem from '@/components/review-item';
import ReviewEditor from '@/components/review-editor';
import { revalidateTag } from 'next/cache';

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/movie`, {
    cache: 'force-cache',
  });

  if (response.ok) {
    const allMovies: MovieData[] = await response.json();
    return allMovies.map((movie) => ({ id: String(movie.id) }));
  }

  return [];
}

async function ReviewDetail({ movieId }: { movieId: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/movie/${movieId}`, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다..</div>;
  }

  const movie = await response.json();

  const { id, title, subTitle, company, runtime, description, posterImgUrl, releaseDate, genres } =
    movie;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} />
      </div>
      <div className={style.info_container}>
        <div>
          <h2>{title}</h2>
          <div>
            {releaseDate} / {genres.join(', ')} / {runtime}분
          </div>
          <div>{company}</div>
        </div>
        <div>
          <div className={style.subTitle}>{subTitle}</div>
          <div className={style.description}>{description}</div>
        </div>
      </div>
    </div>
  );
}

async function ReviewList({ movieId }: { movieId: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/review/movie/${movieId}`, {
    next: { tags: [`review-${movieId}`] },
  });

  if (!response.ok) {
    throw new Error(`Review fetch failed: ${response.statusText}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className={style.container}>
      <ReviewDetail movieId={(await params).id} />
      <ReviewEditor movieId={(await params).id} />
      <ReviewList movieId={(await params).id} />
    </div>
  );
}
