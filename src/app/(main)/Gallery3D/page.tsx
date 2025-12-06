"use client";

import { useState } from "react";
import "@/styles/Gallery.css";
import mediaListData from "@/assets/data/3d.json";

const R2_BASE_URL = "https://3d.asaka.party";

type MediaItem = {
  filename: string;
  title?: string;
  description?: string;
};

export default function Gallery3D() {
  const mediaList: MediaItem[] = mediaListData;
  const [selected, setSelected] = useState<MediaItem | null>(null);

  const isVideo = (f: string): boolean => f.endsWith(".mp4");
  const mediaUrl = (f: string): string => `${R2_BASE_URL}/${f}`;

  return (
    <div className="gallery-container with-nav">
      {/* タイトル */}
      <div className="gallery-text">
        <h1>
          <span className="red">A</span>saka's 3D Gallery!!
        </h1>
      </div>
      <div className="gallery-text">
        <h3>大学から始めた初心者です、ちまちま作ってたりします！</h3>
      </div>
      <div className="gallery-text pale-color">
        <h4>Blender Unity VRChat</h4>
      </div>

      {/* ギャラリー */}
      <div className="gallery">
        {mediaList.map((item, i) =>
          isVideo(item.filename) ? (
            <video
              key={i}
              src={mediaUrl(item.filename)}
              className="gallery-image"
              muted
              loop
              playsInline
              onClick={() => setSelected(item)}
            />
          ) : (
            <img
              key={i}
              src={mediaUrl(item.filename)}
              alt={item.title}
              className="gallery-image"
              onClick={() => setSelected(item)}
            />
          )
        )}
      </div>

      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {isVideo(selected.filename) ? (
              <video
                src={mediaUrl(selected.filename)}
                className="modal-image"
                controls
                autoPlay
                muted
              />
            ) : (
              <img
                src={mediaUrl(selected.filename)}
                alt={selected.title}
                className="modal-image"
              />
            )}

            <h2>{selected.title || "Untitled"}</h2>
            <p>{selected.description || ""}</p>
          </div>
        </div>
      )}
    </div>
  );
}
