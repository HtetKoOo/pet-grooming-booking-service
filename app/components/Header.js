"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  const navLinks = [
    { href: "/", label: "အဓိကစာမျက်နှာ" },
    { href: "/services", label: "ဝန်ဆောင်မှုများ" },
    { href: "/system", label: "စနစ်အကြောင်း" },
    { href: "/impact", label: "အကျိုးကျေးဇူးများ" },
    { href: "/booking", label: "ကြိုတင်ဘွတ်ကင်လုပ်ရန်", isBtn: true },
  ];

  return (
    <>
      <header className="main-header">
        <div className="container navbar-container">
          <Link href="/" className="logo" onClick={closeMenu}>
            <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.2.21 2.35.59 3.42l1.66-1.66a6.002 6.002 0 0 1 7.23-7.23l1.66-1.66A9.957 9.957 0 0 0 12 2zm8.59 6.58l-1.66 1.66a6.002 6.002 0 0 1-7.23 7.23l-1.66 1.66c1.07.38 2.22.59 3.42.59 5.523 0 10-4.477 10-10 0-1.2-.21-2.35-.59-3.42z"/>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-5.5 2.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM6.5 14.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
            </svg>
            <span className="logo-text">Pet Planet</span>
          </Link>
          
          <nav className={`nav-menu ${isOpen ? "open" : ""}`} id="navMenu">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? "active" : ""} ${link.isBtn ? "nav-btn-scroll" : ""}`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            className={`hamburger-btn ${isOpen ? "open" : ""}`}
            id="hamburgerBtn"
            aria-label="Toggle Menu"
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </header>
      <div className={`mobile-overlay ${isOpen ? "open" : ""}`} id="mobileOverlay" onClick={closeMenu}></div>
    </>
  );
}
