import "@/styles/NotFound.css";

export default function Error404() {
    return (
      <main className="notfound">
        <h1>404 - Page Not Found</h1>
        <a href="/">トップへ戻る</a>
        <style>{`
        footer,.footer,.navbar{
            display: none;
        }
      `}</style>
      </main>
    );
  }
  