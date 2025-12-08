export const metadata = {
  title: "DVD Screensaver | 浅香.party!",
  description:
    "名作DVDスクリーンセーバーを再現したページ。速度調整や全画面にも対応。",
};

import DVDClient from "./DVDClient";

export default function Page() {
  return <DVDClient />;
}
