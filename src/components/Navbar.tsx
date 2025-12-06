"use client";

import { useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

import kiroro1 from "@/assets/images/kiroro1.webp";
import kiroro2 from "@/assets/images/kiroro2.webp";
import kotoha1 from "@/assets/images/kotoha1.webp";
import kotoha2 from "@/assets/images/kotoha2.webp";

import "@/styles/Navbar.css";

export default function Navbar() {


  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const [hovered2, setHovered2] = useState<boolean>(false);

  interface NavItem {
    href: string;
    text: string;
  }

  const navItems: NavItem[] = [
    { href: "/", text: "Home" },
    { href: "/link", text: "皆様と一緒!" },
    { href: "/Gallery3D", text: "3D Gallery" },
    { href: "/asakalisten", text: "最近聞いた曲" },
  ];

  return (
    <header className="navbar" aria-label="メインナビゲーション">
      <div className="title" aria-label="サイトタイトル">
          <Link href="/">
            <p className="site-name neon-hover">
                    <span className="red">A</span>saka.party
            </p>
          </Link>

            {/* Kiroro */}
            <Image
                src={hovered ? kiroro2 : kiroro1}
                alt="kiroro"
                width={48}
                height={48}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            />

            {/* ことは */}
            <Image
                src={hovered2 ? kotoha2 : kotoha1}
                alt="kotoha"
                width={48}
                height={48}
                onMouseEnter={() => setHovered2(true)}
                onMouseLeave={() => setHovered2(false)}
            />
      </div>

      {/* ハンバーガーメニュー */}
      <div>
      <button
        className="hamburger-menu link-color"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="メニューを開閉"
        aria-expanded={isMenuOpen}
      >

            <GiHamburgerMenu />
          
        </button>

        {/* ナビゲーションリンク */}
        <ul
          className={`nav-links ${
            isMenuOpen ? "open honey-drip-box border" : ""
          }`}
        >
          {navItems.map(({ href, text }) => (
            <li className="honey-drip-text pop-text" key={href}>
              <Link href={href}>
                {text.split("").map((char, i) => (
                  <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                    {char}
                  </span>
                ))}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
