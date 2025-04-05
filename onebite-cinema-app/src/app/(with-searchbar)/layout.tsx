import { ReactNode } from 'react';
import Searchbar from './searchbar';

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
}
