import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';

export default function Home() {
  return <>인덱스</>;
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
