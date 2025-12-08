"use client";
export const ssr = false;

import { useRef, useEffect, useState } from "react";
import "@/styles/DVD.css";

type Vec2 = { x: number; y: number };
type Dir2 = { dx: number; dy: number };

const getRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;

export default function DVDClient() {
  const logoRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState<Vec2>({ x: 0, y: 0 });
  const [color, setColor] = useState<string>("hsl(0, 0%, 50%)");
  const [speed, setSpeed] = useState<number>(2);

  const positionRef = useRef<Vec2>({ x: 0, y: 0 });
  const directionRef = useRef<Dir2>({ dx: 2, dy: 2 });
  const speedRef = useRef<number>(2);
  const animationRef = useRef<number | null>(null);

  /** speed の内部同期 */
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  /** クライアント側で初期位置を決める */
  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    if (!container || !logo) return;

    const { width, height } = container.getBoundingClientRect();
    const logoW = logo.offsetWidth;
    const logoH = logo.offsetHeight;

    const x = Math.random() * (width - logoW);
    const y = Math.random() * (height - logoH);

    positionRef.current = { x, y };
    setPosition({ x, y });

    // 初期ランダム色（SSRと違って良い）
    setColor(getRandomColor());
  }, []);

  /** アニメーション処理 */
  useEffect(() => {
    const animate = () => {
      const logo = logoRef.current;
      const container = containerRef.current;
      if (!logo || !container) return;

      const { width, height } = container.getBoundingClientRect();
      const logoW = logo.offsetWidth;
      const logoH = logo.offsetHeight;

      let { x, y } = positionRef.current;
      let { dx, dy } = directionRef.current;

      let newX = x + dx;
      let newY = y + dy;
      let bounce = false;

      if (newX <= 0 || newX + logoW >= width) {
        dx = -dx;
        bounce = true;
        newX = Math.max(0, Math.min(newX, width - logoW));
      }

      if (newY <= 0 || newY + logoH >= height) {
        dy = -dy;
        bounce = true;
        newY = Math.max(0, Math.min(newY, height - logoH));
      }

      if (bounce) {
        setColor(getRandomColor());
      }

      directionRef.current = {
        dx: dx < 0 ? -speedRef.current : speedRef.current,
        dy: dy < 0 ? -speedRef.current : speedRef.current,
      };

      positionRef.current = { x: newX, y: newY };
      setPosition({ x: newX, y: newY });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  /** 全画面表示 */
  const goFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
    // Safari
    // @ts-ignore
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  };

  return (
    <div>
      <div ref={containerRef} className="dvd-container">
        <div
          ref={logoRef}
          className="dvd-logo"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 300 186">
            <g
              transform="translate(0,186) scale(0.05,-0.05)"
              fill={color}
              stroke="none"
            >
            <path d="M658 3313 l-31 -147 441 -15 c360 -11 457 -21 524 -50 371 -163 194 -590 -286 -692 -135 -28 -326 -39 -326 -18 0 12 135 556 152 614 10 32 -12 35 -267 35 l-278 0 -106 -455 c-59 -250 -112 -467 -117 -483 -15 -40 816 -19 1075 28 644 117 973 389 936 773 -5 54 -6 95 -2 91 6 -7 411 -1109 435 -1187 13 -42 9 -43 -322 -55 -1903 -71 -2760 -300 -2016 -539 1147 -368 5150 -222 5021 184 -57 179 -766 288 -2334 359 l-313 14 620 697 620 696 423 -7 c393 -6 430 -10 529 -54 310 -139 251 -471 -114 -638 -97 -45 -471 -101 -497 -76 -4 4 25 144 64 310 39 167 71 312 71 322 0 49 -538 24 -550 -25 -124 -527 -210 -896 -210 -906 0 -36 1092 5 1246 47 660 181 945 681 603 1061 -208 231 -356 263 -1221 263 l-685 0 -342 -429 c-188 -236 -350 -434 -360 -441 -17 -10 -61 118 -223 655 l-65 215 -1032 0 -1033 0 -30 -147z m2678 -1783 c382 -89 287 -231 -195 -289 -545 -67 -1202 55 -1072 198 115 127 878 182 1267 91z"/> <path d="M723 761 c4 -11 66 -128 137 -260 172 -320 178 -320 363 16 161 291 154 263 68 263 -65 0 -73 -8 -155 -160 -105 -194 -91 -194 -186 0 -78 159 -78 160 -156 160 -42 0 -74 -9 -71 -19z"/> <path d="M1700 520 l0 -263 65 7 65 6 0 250 0 250 -65 6 -65 7 0 -263z"/> <path d="M2200 523 l0 -263 136 0 c600 0 646 484 49 516 l-185 9 0 -262z m387 116 c132 -104 38 -279 -150 -279 l-97 0 0 160 0 160 97 0 c68 0 113 -12 150 -41z"/> <path d="M3144 525 l6 -255 260 0 c254 0 260 1 266 45 7 44 2 45 -175 45 l-181 0 0 70 0 70 170 0 c157 0 170 3 170 40 0 37 -13 40 -171 40 l-172 0 7 55 c6 59 5 59 261 63 81 2 95 8 95 42 0 38 -13 40 -271 40 l-270 0 5 -255z"/> <path d="M4177 740 c-286 -152 -155 -478 193 -479 367 -2 522 319 230 474 -113 59 -316 61 -423 5z m290 -59 c27 -10 68 -39 91 -64 153 -164 -159 -355 -336 -205 -162 136 33 350 245 269z"/>
            </g>
          </svg>
        </div>
      </div>

      <div className="dvd-ui">
        <label>スピード: <span className="dvd-speed-value">{speed}</span></label>
        <input
          type="range"
          min={1}
          max={20}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
        <button onClick={goFullscreen}>全画面</button>
      </div>
    </div>
  );
}
