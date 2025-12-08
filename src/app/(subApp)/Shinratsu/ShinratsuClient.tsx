"use client"

import { useState } from 'react';
import shinratsuPic from '@/assets/images/shinratsu.webp';
import maroyakaPic from '@/assets/images/maroyaka.webp';
import sanmiPic from '@/assets/images/sanmi.webp';
import nigamiPic from '@/assets/images/nigami.webp';
import { MdDoorBack } from "react-icons/md";
import "@/styles/Shinratsu.css";


type ImageKey = "shinratsu" | "maroyaka" | "sanmi" | "nigami" | "";

export default function ShinratsuClient() {

  const [clickedImage, setClickedImage] = useState<string>('');
  const [isFullView, setIsFullView] = useState<boolean>(false); // トグル用
  const [is210on, setIs210on] = useState<boolean>(false);

  const handle210onClick = () => {
    setIs210on(!is210on);
    setClickedImage('');
    setIsFullView(false);
  };

  const handleImageClick = (image: ImageKey) => {
    setIsFullView(!isFullView);
    setClickedImage(image);
  };

  return (
  <div className="shin-root">

      <a href="/" className="back-button" aria-label="トップに戻る">
        <MdDoorBack size={28} />
      </a>

      <button
        onClick={handle210onClick}
        className={`toggle-button ${is210on ? "isclicked" : ""}`}
        aria-pressed={is210on}
        aria-label="210onモード切り替え"
      >
        210on
      </button>

      {/* --- 辛辣 & まろやか --- */}
      <section className={is210on ? "hidden-section" : "visible-section"}>
        <h1
          className={`shinText ${
            clickedImage === "shinratsu" && isFullView ? "visibleText" : ""
          }`}
        >
          辛辣波乱
        </h1>

        <h1
          className={`maroText ${
            clickedImage === "maroyaka" && isFullView ? "visibleText" : ""
          }`}
        >
          まろやか平和
        </h1>

        <div className="shinratsuPage">
          <img
            className={`shinratsu ${
              clickedImage === "shinratsu" && isFullView ? "animate img-active" : "img-inactive"
            }`}
            src={shinratsuPic.src}
            alt="辛辣波乱のイメージ"
            onClick={() => handleImageClick("shinratsu")}
          />

          <img
            className={`maroyaka ${
              clickedImage === "maroyaka" && isFullView ? "animate img-active" : "img-inactive"
            }`}
            src={maroyakaPic.src}
            alt="まろやか平和のイメージ"
            onClick={() => handleImageClick("maroyaka")}
          />

          <img
            className={`blurredShinratsuHalf ${
              clickedImage === "shinratsu" && isFullView
                ? "blurredFull"
                : clickedImage === "shinratsu"
                ? "fullFront"
                : "fullBack"
            }`}
            src={shinratsuPic.src}
            alt=""
            aria-hidden="true"
          />

          <img
            className={`blurredMaroyakaHalf ${
              clickedImage === "maroyaka" && isFullView
                ? "blurredFull"
                : clickedImage === "maroyaka"
                ? "fullFront"
                : "fullBack"
            }`}
            src={maroyakaPic.src}
            alt=""
            aria-hidden="true"
          />
        </div>
      </section>

      <section className={`absolute ${is210on ? "visible-section" : "hidden-section"}`}>
        <h1
          className={`shinText ${
            clickedImage === "nigami" && isFullView ? "visibleText" : ""
          }`}
        >
          シャープな苦味
        </h1>

        <h1
          className={`maroText ${
            clickedImage === "sanmi" && isFullView ? "visibleText" : ""
          }`}
        >
          まろやか酸味
        </h1>

        <div className="shinratsuPage">
          <img
            className={`shinratsu ${
              clickedImage === "nigami" && isFullView ? "animate img-active" : "img-inactive"
            }`}
            src={nigamiPic.src}
            alt="シャープな苦味のイメージ"
            onClick={() => handleImageClick("nigami")}
          />

          <img
            className={`maroyaka ${
              clickedImage === "sanmi" && isFullView ? "animate img-active" : "img-inactive"
            }`}
            src={sanmiPic.src}
            alt="まろやか酸味のイメージ"
            onClick={() => handleImageClick("sanmi")}
          />

          <img
            className={`blurredShinratsuHalf ${
              clickedImage === "nigami" && isFullView
                ? "blurredFull"
                : clickedImage === "nigami"
                ? "fullFront"
                : "fullBack"
            }`}
            src={nigamiPic.src}
            alt=""
            aria-hidden="true"
          />

          <img
            className={`blurredMaroyakaHalf ${
              clickedImage === "sanmi" && isFullView
                ? "blurredFull"
                : clickedImage === "sanmi"
                ? "fullFront"
                : "fullBack"
            }`}
            src={sanmiPic.src}
            alt=""
            aria-hidden="true"
          />
        </div>
      </section>
    </div>
  );
}


