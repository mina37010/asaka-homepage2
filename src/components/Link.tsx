"use client";

import Image from "next/image";
import "@/styles/Link.css";

import { FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";
import asaka_baner from "@/assets/images/asaka_baner.png";

export default function LinkList() {
  return (
    <nav className="footer">
      {/* リンク集 */}
      <div className="link-section">

        {/* ページ内部リンク */}
        <nav aria-label="サイト内リンク" className="page-links">
              <button
                className="scroll-to-top link-color"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="ページ上部に戻る"
              >
                ↑
              </button>
        </nav>

        {/* SNS */}
        <div className="social-links">
          <ul>

            {/* Twitter */}
            <li className="social-item twitter">
              <span className="snsId link-color-hover">
                Twitter: @akira__okumura
              </span>
              <a
                href="https://twitter.com/akira__okumura"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter アカウント @akira__okumura"
              >
                <FaTwitter aria-hidden="true" />
              </a>
            </li>

            {/* Instagram */}
            <li className="social-item instagram">
              <span className="snsId link-color-hover">
                Instagram: @sun__vector
              </span>
              <a
                href="https://instagram.com/sun__vector"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram アカウント @sun__vector"
              >
                <FaInstagram aria-hidden="true" />
              </a>
            </li>

            {/* GitHub */}
            <li className="social-item github">
              <span className="snsId link-color-hover">
                GitHub: mina37010
              </span>
              <a
                href="https://github.com/mina37010"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub アカウント mina37010"
              >
                <FaGithub aria-hidden="true" />
              </a>
            </li>

          </ul>
        </div>
      </div>

      <div className="baner-links">
        <Image
          src={asaka_baner}
          alt="Asaka バナー"
          className="footer-baner"
        />
      </div>

    </nav>
  );
}
