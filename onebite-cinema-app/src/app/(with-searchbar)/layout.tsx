import { ReactNode } from 'react';

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      Searchbar Layout
      {children}
    </div>
  );
}
