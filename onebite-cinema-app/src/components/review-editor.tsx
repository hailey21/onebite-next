'use client';

import { useActionState } from 'react';
import style from './review-editor.module.css';
import { createReviewAction } from '@/actions/create-review-action';

export default function ReviewEditor({ movieId }: { movieId: string }) {
  const [state, formAction, isPending] = useActionState(createReviewAction, null);

  if (state && !state.status) {
    alert(state.error);
  }

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input name="movieId" value={movieId} hidden readOnly />
        <textarea disabled={isPending} required name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
          <input disabled={isPending} required name="author" placeholder="작성자" />
          <button disabled={isPending} type="submit">
            작성하기
          </button>
        </div>
      </form>
    </section>
  );
}
