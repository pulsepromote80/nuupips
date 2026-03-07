"use client";

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function AppLayout({ children }) {
  const pathname = usePathname();
  
  // Check if current route should hide Header and Footer
  // Admin routes, authentication routes, and dashboard routes should not show Header/Footer
  const hideHeaderFooter = 
    pathname?.startsWith('/admin') || 
    pathname?.startsWith('/user-authentication') || 
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/nupips-team') ||
    pathname?.startsWith('/shop') ||
    pathname?.startsWith('/learn') ||
    pathname?.startsWith('/shop') ||
    pathname?.startsWith('/competition') ||
    pathname?.startsWith('/brokers') ||
    pathname?.startsWith('/nupips-incomes') ||
    pathname?.startsWith('/deposit') ||
    pathname?.startsWith('/withdrawal')  ||
    pathname?.startsWith('/transfer') ||
    pathname?.startsWith('/transaction-history')
  
  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main>{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

