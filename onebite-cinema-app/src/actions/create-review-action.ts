'use server';

import { delay } from '@/util/delay';
import { revalidateTag } from 'next/cache';

export async function createReviewAction(_: any, formData: FormData) {
  const movieId = formData.get('movieId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!movieId || !content || !author) {
    return {
      status: false,
      error: '리뷰 내용과 작성자를 입력해주세요.',
    };
  }
  try {
    await delay(2000);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/review`, {
      method: 'POST',
      body: JSON.stringify({ movieId, content, author }),
    });

    revalidateTag(`review-${movieId}`);
    console.log(response.status);
  } catch (err) {
    console.error(err);
    return;
  }
}
