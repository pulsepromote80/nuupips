"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout({ children }) {
  const pathname = usePathname();

  const hiddenRoutes = [
    "/admin",
    "/user-authentication",
    "/dashboard",
    "/nupips-team",
    "/shop",
    "/learn",
    "/competition",
    "/brokers",
    "/nupips-incomes",
    "/deposit",
    "/withdrawal",
    "/transfer",
    "/transaction-history",
  ];

  const hideHeaderFooter = hiddenRoutes?.some((route) =>
    pathname?.startsWith(route)
  );

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main>{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}