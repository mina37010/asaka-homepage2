"use client";

import { useEffect, useRef, useState } from "react";
import "@/styles/NowListen.css";

type Track = {
  title: string;
  artist: string;
  image: string;
  url: string;
};

export default function NowListenPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fallback = [
      {
        title: "Loading...",
        artist: "Unknown Artist",
        image: "/placeholder.png",
        url: "#",
      },
      {
        title: "Loading...",
        artist: "Unknown Artist",
        image: "/placeholder.png",
        url: "#",
      },
    ];

    fetch("/api/nowlisten")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => setTracks(data as Track[]))
      .catch((err) => {
        console.error("Fetch error:", err);
        setTracks(fallback);
      });
  }, []);

  return (
    <div className="nowlisten-container with-nav">
      <h1>
        <span className="red">A</span>saka’s Recently Played
      </h1>

      <div className="track-scroll-container" ref={containerRef}>
        {tracks.map((track, i) => (
          <div className="track-card" key={i}>
            <img src={track.image} alt={track.title} />

            <a href={track.url} target="_blank" rel="noopener noreferrer">
              {track.title}
            </a>

            <p>{track.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
