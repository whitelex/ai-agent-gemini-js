// agents/ai-agent-gemini-js/index.js
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Use import for consistency

class GeminiClient {
  /**
   * Initialize the Gemini client with your API key.
   * @param {string} apiKey - Your Google API key for Gemini
   */
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.genAI = new GoogleGenerativeAI(this.apiKey);

    // Initialize models
    this.textModel = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    this.visionModel = this.genAI.getGenerativeModel({
      model: "gemini-pro-vision",
    });
  }

  /**
   * Generate text response using Gemini Pro.
   * @param {string} prompt - The text prompt to send to Gemini
   * @param {number} temperature - Controls randomness in the response (0.0 to 1.0)
   * @returns {Promise<string>} Generated response
   */
  async generateText(prompt, temperature = 0.7) {
    try {
      const result = await this.textModel.generateContent(prompt, {
        temperature: temperature,
      });

      const response = await result.response;
      return response.text();
    } catch (error) {
      return `Error generating text: ${error.message}`;
    }
  }
}

export default function (router) {
  // Apply middleware to the router, not a separate app instance
  router.use(express.json());

  router.post("/generate-text", async (req, res) => {
    const { api_key, prompt, temperature = 0.7 } = req.body;

    if (!api_key) {
      return res.status(400).json({ error: "API key is required" });
    }

    const client = new GeminiClient(api_key);
    try {
      const response = await client.generateText(prompt, temperature);
      res.json({ response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // DO NOT call app.listen() here. The main backend handles the port.
}