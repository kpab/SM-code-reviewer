import axios from "axios";

export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;

  const { messages } = req.body;

  try {
    const requestData = {
      model: "gpt-4", // モデル名を修正
      messages,
    };

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ message: response.data.choices[0].message.content });
  } catch (error) {
    console.error(
      "APIリクエストエラー:",
      error.response?.data || error.message
    );
    console.log("Error Response Data:", error.response?.data);
    console.log("Error Response Status:", error.response?.status);
    console.log("Error Response Headers:", error.response?.headers);

    // クライアントにJSON形式でエラーメッセージを返す
    res
      .status(500)
      .json({ error: "APIリクエストに失敗しました。もう一度お試しください。" });
  }
}
