import fetchOneMovie from '@/lib/fetch-one-movie';
import style from './[id].module.css';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import fetchMovies from '@/lib/fetch-movies';

export const getStaticPaths = async () => {
  const allMovies = await fetchMovies();
  const paths = allMovies.map((movie) => ({
    params: { id: String(movie.id) },
  }));

  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      movie,
    },
  };
};

export default function Page({ movie }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return '로딩중입니다..';
  }

  if (!movie) {
    return '문제가 발생했습니다. 다시 시도하세요';
  }

  const { id, title, releaseDate, company, genres, subTitle, description, runtime, posterImgUrl } =
    movie;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url(${posterImgUrl})` }}
      >
        <img src={posterImgUrl} />
      </div>

      <div className={style.title}>{title}</div>
      <div className={style.info}>
        {releaseDate} / {genres} / {runtime}분
      </div>
      <div className={style.info}>{company}</div>
      <br />
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
