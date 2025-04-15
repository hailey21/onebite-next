'use server';

import { error } from 'console';
import { revalidateTag } from 'next/cache';

export async function deleteReviewAction(_: any, formData: FormData) {
  const reviewId = formData.get('reviewId')?.toString();
  const movieId = formData.get('movieId')?.toString();

  if (!reviewId) {
    return {
      status: false,
      error: '삭제할 리뷰가 없습니다.',
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/review/${reviewId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return {
        status: false,
        error: response.statusText,
      };
    }

    revalidateTag(`review-${movieId}`);
  } catch (err) {
    return {
      status: false,
      error: `리뷰 삭제에 실패했습니다. ${err}`,
    };
  }
}
