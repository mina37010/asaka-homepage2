"use client";

import "@/styles/WhatsNew.css";
import updatesData from "@/assets/data/updates.json";

interface UpdateItem {
  date: string;
  content: string;
}

function isNew(dateString: string): boolean {
  const updateDate = new Date(dateString);
  const today = new Date();
  const diffDays = (today.getTime() - updateDate.getTime()) / (1000 * 3600 * 24);
  return diffDays <= 3;
}

export default function WhatsNew() {
  const updates: UpdateItem[] = [...updatesData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

  return (
    <div className="whats-new-list">
      {updates.map((item, index) => (
        <article key={index} className="whats-new-item">
          <div className="pale-color">
            {item.date}
            {isNew(item.date) && <span className="new-badge">NEW</span>}
          </div>
          <p className="base-color">{item.content}</p>
        </article>
      ))}
    </div>
  );
}
