import axios from "axios";

class Client {
  async completion(messages) {
    // サーバーレス関数にリクエストを送る
    const response = await axios.post("/api/openai", { messages });
    return response.data.message;
  }
}

const openai = new Client();
export default openai;
