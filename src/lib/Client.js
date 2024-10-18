import axios from "axios";

class Client {
  async completion(messages) {
    try {
      const response = await axios.post("/api/openai", { messages });
      return response.data.message;
    } catch (error) {
      console.error("Error in API request:", error);
      throw new Error("Failed to get completion. Please try again.");
    }
  }
}

const openai = new Client();
export default openai;
