"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getFullname, getToken, removeToken } from "../lib/authToken";
import { FaChevronDown } from "react-icons/fa";
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [token, setToken] = useState();
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);
  const [fullnameState, setFullnameState] = useState(getFullname());
  useEffect(() => {
    const storedToken = getToken();
    setToken(storedToken);
  }, []);

  const isLoggedIn = !!token;
  const fullname = fullnameState;

  // Listen for auth changes (same-window) and storage events (other tabs)
  useEffect(() => {
    const handleAuthChange = () => {
      setToken(getToken());
      setFullnameState(getFullname());
    };

    const handleStorage = (e) => {
      if (e.key === "token" || e.key === "FullName") {
        handleAuthChange();
      }
    };

    window.addEventListener("authChange", handleAuthChange);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
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
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/pages/contact" },
  ];

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          {/* Logo */}
          <Link href="/" className="logo">
            <Image
              src="/assets/img/logo.png"
              alt="Logo"
              width={110}
              height={60}
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="nav-desktop">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link ${pathname === item.href ? "active" : ""}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 big-screen-view">
            {!isLoggedIn ? (
              <Link
                href="/user-authentication/login"
                // style={{backgroundColor: "#fff"}}
                className="btn btn-sm px-4 py-2 text-sm font-medium rounded-lg bg-gray-50 text-black hover:bg-gray-400 transition duration-300"
              >
                Login / Register
              </Link>
            ) : (
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="btn btn-sm px-4 py-2 text-sm font-medium rounded-lg bg-gray-50 text-black hover:bg-gray-400 transition duration-300"
                >
                  {fullname} <FaChevronDown />
                </button>

                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
                    <Link
                      href="/"
                      onClick={() => setAccountOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Home
                    </Link>

                    <Link
                      href="/"
                      onClick={() => {
                        removeToken();
                        setAccountOpen(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            )}

            <Link
              href="/user-authentication/register"
              // style={{backgroundColor: "#fff"}}
              className="px-4 py-2 text-sm font-medium rounded-lg  text-black bg-gray-50 hover:text-gray-400  transition duration-300"
            >
              Open Trading Account (IB)
            </Link>
          </div>
          {/* Mobile Button - FIXED: Icon changes based on open state */}
          <button className="menu-btn" onClick={() => setOpen(!open)}>
            <i className={`fas ${open ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`menu-overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

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
              className={`nav-link ${pathname === item.href ? "active" : ""}`}
            >
              {item.name}
            </Link>
          ))}

              <div className="flex items-center gap-3 phone-screen-view">
            {!isLoggedIn ? (
              <Link
                href="/user-authentication/login"
                // style={{backgroundColor: "#fff"}}
                className="btn btn-sm px-4 py-2 text-sm font-medium rounded-lg bg-gray-50 text-black hover:bg-gray-400 transition duration-300"
              >
                Login / Register
              </Link>
            ) : (
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="btn btn-sm px-4 py-2 text-sm font-medium rounded-lg bg-gray-50 text-black hover:bg-gray-400 transition duration-300"
                >
                  {fullname} <FaChevronDown />
                </button>

                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
                    <Link
                      href="/"
                      onClick={() => setAccountOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Home
                    </Link>

                    <Link
                      href="/"
                      onClick={() => {
                        removeToken();
                        setAccountOpen(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            )}

            <Link
              href="/user-authentication/register"
              // style={{backgroundColor: "#fff"}}
              className="px-4 py-2 text-sm font-medium rounded-lg  text-black bg-gray-50 hover:text-gray-400  transition duration-300"
            >
              Open Trading Account (IB)
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
