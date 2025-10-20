'use client';

import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </>
  );
}
