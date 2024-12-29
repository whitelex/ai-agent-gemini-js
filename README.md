# Gemini AI Agent Plugin

This is a plugin for controlling AI agents using the Google Generative AI Gemini models. It provides an API endpoint to generate text responses using the Gemini Pro model.

## Installation

1. Clone the repository.
2. Install the dependencies:

    ```sh
    npm install
    ```

## Usage

This plugin is designed to be used as part of a larger backend system. It exports a function that takes an Express router as an argument and sets up the necessary routes.

### Example

```javascript
import express from 'express';
import geminiPlugin from './index.js';

const app = express();
const router = express.Router();

geminiPlugin(router);

app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

## API Endpoint

### `POST /api/generate-text`

Generate a text response using the Gemini Pro model.

#### Request Body:

```json
{
  "api_key": "YOUR_API_KEY",
  "prompt": "Your prompt here",
  "temperature": 0.7
}
```

-   **`api_key`** (string, required): Your Google API key for Gemini.
-   **`prompt`** (string, required): The text prompt to send to Gemini.
-   **`temperature`** (number, optional, default: 0.7): Controls randomness in the response. Higher values (closer to 1.0) produce more varied and creative output, while lower values (closer to 0.0) make the output more deterministic and focused.

```json
{
  "response": "The generated text from Gemini will appear here."
}
```

### Example
```shell
curl -X POST http://localhost:3000/api/generate-text \
   -H "Content-Type: application/json" \
   -d '{
     "api_key": "YOUR_API_KEY",
     "prompt": "Tell me a joke.",
     "temperature": 0.7
   }'
```