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
});```