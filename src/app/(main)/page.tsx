"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

import { PiMountainsFill } from "react-icons/pi";
import { GiCompactDisc } from "react-icons/gi";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import WhatsNew from "@/components/WhatsNew";

import leaf from "@/assets/images/leaf.webp";
import asaka from "@/assets/images/asaka.jpeg";

interface SliderImage {
  src: string;
  text: string;
  link: string;
}

interface AnimatedChar {
  char: string;
  isFirst: boolean;
  i: number;
}

export default function Page() {
  const images: SliderImage[] = [
    {
      src: "https://pbs.twimg.com/profile_images/1601292387250499584/09YdhLVp_400x400.jpg",
      text: "いなにわうどん",
      link: "https://いなにわうどん.みんな",
    },
    {
      src: "https://pbs.twimg.com/profile_images/1722595990803447808/KzZAqAZR_400x400.png",
      text: "ちゅるり",
      link: "https://itsu.dev",
    },
    {
      src: "https://pbs.twimg.com/profile_images/1876704743046967296/WRa_prYp_400x400.png",
      text: "ぱうろ",
      link: "https://210o.net",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goToNextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // 自動スライド
  useEffect(() => {
    const interval = setInterval(goToNextImage, 5000);
    return () => clearInterval(interval);
  }, [goToNextImage]);

  // Asaka.party! ロードアニメーション
  const text = "Asaka.party!";
  const [chars, setChars] = useState<AnimatedChar[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    const splitChars = text.split("").map((char, i): AnimatedChar => ({
      char,
      isFirst: i === 0,
      i,
    }));
    setChars(splitChars);
  }, []);

  useEffect(() => {
    const navigationEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    const isReload = navigationEntries.length > 0 && navigationEntries[0].type === "reload";
    const hasShownAnimation = sessionStorage.getItem("hasShownAnimation");

    if (isReload || !hasShownAnimation) {
      setIsAnimating(true);
      sessionStorage.setItem("hasShownAnimation", "true");
      document.body.style.overflow = "hidden";

      const timer = setTimeout(() => {
        setIsAnimating(false);
        document.body.style.overflow = "";
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      document.body.style.overflow = "";
    }
  }, []);

  return (
    <main>

      {isAnimating && (
        <div className={`animation-overlay ${isAnimating ? "active" : "hidden"}`}>
          <div className="bg-slide" />
          <div className="blur-overlay" />
          <h1>
            {chars.map(({ char, isFirst, i }) => (
              <span
                key={i}
                className={`char ${isFirst ? "last" : ""}`}
                style={{ ["--i" as any]: isFirst ? chars.length : i }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>
      )}

      <section
        className="homeA"
        aria-labelledby="whatis-title"
      >
        <div className="homeA-sep1">
          <h2 id="whatis-title" className="pale-color">
            What is this site?
          </h2>

          <p className="base-color intro-copy">
            This is <span className="red">A</span>saka&apos;s<br/> portfolio!
          </p>
        </div>

        <div className="homeA-sep2">
          <Image src={leaf} alt="葉っぱの飾り画像" className="leaf" />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="homeB" aria-labelledby="about-title">
        <div className="homeB-container">

          <header className="homeB-container-title borderB">
            <h2 id="about-title">About</h2>
          </header>

          <div className="homeB-container-content">

            {/* プロフィール */}
            <div className="homeB-container-sep1">
              <Image src={asaka} alt="Asakaのイラスト画像" className="asaka" />
              <h3>浅香ひなた</h3>
            </div>

            {/* 詳細プロフ */}
            <div className="homeB-container-sep2">

              <h3><span className="red">趣</span>味</h3>
              <p>三味線・和太鼓・ゲーム・コードこねこね・ラーメン・睡眠</p>

              <h3><span className="red">好</span>きなゲーム</h3>
              <p>キングダム ハーツII ファイナル ミックス+</p>
              <p>Shadow Corridor</p>

              <h3><span className="red">好</span>きなアーティスト</h3>
              <p>平沢進</p>
              <p>SOUL&apos;d OUT</p>
              <p>BABY METAL</p>
              <p>サカナクション</p>
              <p>CANDY TUNE</p>

              <h3><span className="red">好</span>きな場所</h3>
              <p>東京都 東大和市</p>

              <h3><span className="red">ち</span>ょっとやってたこと</h3>
              <p>3Dモデリング <span className="pale-color">blender</span></p>
              <p>VR</p>
            </div>

            <p className="scroll-it pale-color">Scroll it! →</p>
          </div>
        </div>
      </section>

      {/* PLAYGROUND */}
      <section
        className="homeParty"
        aria-labelledby="playground-title"
      >
        <div className="homeParty-container">

          <header className="homeParty-title">
            <h2 id="playground-title" className="borderB">
              <span className="red">A</span>saka&apos;s playground!
            </h2>
          </header>

          <div className="homePartybar">
            <Link href="/DVD" className="bottun border" aria-label="DVDのあれ">
              <GiCompactDisc />
            </Link>
            <Link href="/Shinratsu" className="bottun border" aria-label="画像を比較する謎ページ">
              <PiMountainsFill />
            </Link>
          </div>

        </div>
      </section>

      {/* WHAT'S NEW */}
      <section
        className="homeC"
        aria-labelledby="whatsnew-title"
      >
        <div className="jam-drip-box">
          <div className="jam-drip-text">
            <h2 id="whatsnew-title">What&apos;s New !!</h2>
            <WhatsNew />
          </div>
        </div>

        {/* スライダー（皆様のサイト紹介） */}
        <section className="linkContainer" aria-labelledby="friend-links-title">
          <h2 id="friend-links-title" className="visually-hidden">
            皆様のサイトリンク
          </h2>

          <div >
            {images.map((image, index) => (
              <article
                key={index}
                className={`imageWrapper ${index === currentIndex ? "active" : ""}`}
              >
                <a
                  href={image.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className="siteText">皆様のサイト</h3>
                  <img
                    className="linkImage"
                    src={image.src}
                    alt={`${image.text} のサイトアイコン`}
                  />

                  <div className="hoverOverlay">
                    <div className="overlayText">
                      <h3>{image.text}</h3>
                      <p>{image.link.replace("https://", "")}</p>
                    </div>
                  </div>
                </a>

                <button className="prevButton" onClick={goToPrevImage}>
                  <SlArrowLeft />
                </button>

                <button className="nextButton" onClick={goToNextImage}>
                  <SlArrowRight />
                </button>
              </article>
            ))}
          </div>
        </section>
      </section>

    </main>
  );
}
