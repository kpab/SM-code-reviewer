// api/openai.js
import axios from "axios";

export default async function handler(req, res) {
  const { messages } = req.body;

  try {
    const requestData = {
      model: "gpt-4o",
      messages,
    };

    // OpenAI APIにリクエストを送る
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // APIキーをサーバー側で安全に管理
        },
      }
    );

    // OpenAIからの応答をフロントエンドに返す
    res.status(200).json({ message: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "API request failed" });
  }
}
