// api/openai.js
import axios from "axios";

export default async function handler(req, res) {
  const { messages } = req.body;

  try {
    const requestData = {
      model: "gpt-4o",
      messages,
    };

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // APIキーはここで管理
        },
      }
    );

    res.status(200).json({ message: response.data.choices[0].message.content });
  } catch (error) {
    console.error(
      "APIリクエストエラー:",
      error.response?.data || error.message
    );

    // クライアントにJSON形式でエラーメッセージを返す
    res
      .status(500)
      .json({ error: "APIリクエストに失敗しました。もう一度お試しください。" });
  }
}
