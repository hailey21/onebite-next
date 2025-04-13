import { ReviewData } from '@/types';
import style from './review-item.module.css';

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');

  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = days[date.getDay()];

  return `${year}.${month}.${day} ${dayOfWeek}`;
}

export default function ReviewItem({ id, content, author, createdAt, movieId }: ReviewData) {
  return (
    <div className={style.container}>
      <div className={style.top_container}>
        <div className={style.author}>{author}</div>
        <div className={style.date}>{formatDate(new Date(createdAt))} 작성됨</div>
      </div>

      <div className={style.content}>{content}</div>
      <div className={style.buttom_container}>
        <div className={style.delete_btn}>🗑️ 리뷰 삭제하기</div>
      </div>
    </div>
  );
}
