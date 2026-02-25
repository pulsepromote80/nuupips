"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar when navigating to a new page
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Education", href: "/pages/education" },
    { name: "Community", href: "/pages/community" },
    { name: "Academy Partnership", href: "/pages/partnership" },
    { name: "Experts", href: "/pages/experts" },
    { name: "Videos", href: "/pages/videos" },
    { name: "Blog", href: "/pages/blog" },
    { name: "Contact", href: "/pages/contact" }, 
    
  ];

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          {/* Logo */}
          <Link href="/" className="logo">
            <Image src="/assets/img/logo.png" alt="Logo" width={110} height={60} />
          </Link>

          {/* Desktop Menu */}
          <nav className="nav-desktop">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link ${
                  pathname === item.href ? "active" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Button - FIXED: Icon changes based on open state */}
          <button className="menu-btn" onClick={() => setOpen(!open)}>
            <i className={`fas ${open ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div className={`menu-overlay ${open ? "show" : ""}`} onClick={() => setOpen(false)} />

      {/* Mobile Drawer */}
      <aside className={`mobile-drawer ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          <i className="fas fa-times"></i>
        </button>

        <nav className="nav-mobile">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`nav-link ${
                pathname === item.href ? "active" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}