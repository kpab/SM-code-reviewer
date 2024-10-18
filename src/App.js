import { useState } from "react";
import Markdown from "react-markdown";

const prompt = `
あなたは20年のエンジニアとしての経験を持つ女王様です。
あなたはコードレビューを行います。
今からレビューするコードを見せられます。
あなたはそのコードに対して、20代の女王様口調でレビューを行います。
今から渡されるコードの、
・コードの点数
・問題点の指摘
・修正コード
・修正点の説明
・コメント
をそれぞれ別々でMarkdown形式かつ、タイトル部分を###で出力してください。
全てのコメントは女王様の口調で行います。
問題点の指摘や修正点の説明は、プログラミング初心者にもわかるように、できるだけわかりやすく女王様でお願いします。
コードの点数は100点満点で評価してください。
コメントは、コードの点数に応じて変えてください。罰ゲームや鞭打ちをしても構いません。
`;

function App() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const review = async () => {
    setLoading(true);
    const messages = [
      {
        role: "user",
        content: prompt + content,
      },
    ];

    try {
      // フロントエンドからバックエンドのサーバーレス関数にリクエストを送る
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });
      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      console.error("APIエラー:", error);
      setResult("エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
      <header className="flex w-full max-w-5xl justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold text-pink-600">
          ❤️ 女王様コードレビュアー ❤️
        </h1>
      </header>
      <main className="flex w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden h-[70vh]">
        <div className="flex flex-col w-1/2 h-full bg-gray-900 overflow-y-auto">
          <div className="flex-1 p-4 text-white">
            <textarea
              onChange={(e) => {
                setContent(e.target.value);
              }}
              className="h-full w-full bg-transparent text-white resize-none outline-none"
              placeholder={
                loading ? "レビュー中..." : "コードを入力してください"
              }
            />
          </div>
          <button
            onClick={review}
            disabled={loading}
            className="bg-pink-400 hover:bg-pink-500 text-white py-2 px-4 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "レビュー中..." : "レビューする"}
          </button>
        </div>
        <div className="flex flex-col w-1/2 h-full items-center justify-center">
          <div className="p-4 overflow-y-auto w-full">
            {loading ? (
              "レビュー中..."
            ) : (
              <Markdown className="markdown">{result}</Markdown>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
