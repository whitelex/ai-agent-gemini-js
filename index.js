const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());

class GeminiClient {
    /**
     * Initialize the Gemini client with your API key.
     * @param {string} apiKey - Your Google API key for Gemini
     */
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        
        // Initialize models
        this.textModel = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
        this.visionModel = this.genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    }

    /**
     * Generate text response using Gemini Pro.
     * @param {string} prompt - The text prompt to send to Gemini
     * @param {number} temperature - Controls randomness in the response (0.0 to 1.0)
     * @returns {Promise<string>} Generated response
     */
    async generateText(prompt, temperature = 0.7) {
        try {
            // Fixed: Correct way to send prompt to Gemini API
            const result = await this.textModel.generateContent(prompt, {
                temperature: temperature
            });

            const response = await result.response;
            return response.text();
        } catch (error) {
            return `Error generating text: ${error.message}`;
        }
    }
}

app.post('/generate-text', async (req, res) => {
    const { api_key, prompt, temperature = 0.7 } = req.body;

    if (!api_key) {
        return res.status(400).json({ error: 'API key is required' });
    }

    const client = new GeminiClient(api_key);
    try {
        const response = await client.generateText(prompt, temperature);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});