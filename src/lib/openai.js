import axios from "axios";

class Client {
  constructor() {
    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  }

  async completion(messages) {
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
          Authorization: `Bearer ${this.apiKey}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  }
}

const openai = new Client();

export default openai;
