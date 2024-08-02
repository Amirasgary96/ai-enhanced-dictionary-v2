const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Groq = require("groq-sdk");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/expand', async (req, res) => {
  try {
    const { term, definition } = req.body;
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Expand on the definition of from a medical and clinical perspective only "${term}": ${definition}\n\nExpanded explanation:`,
        },
      ],
      model: "mixtral-8x7b-32768",
      max_tokens: 100,
      temperature: 0.7,
    });
    res.json({ expanded: chatCompletion.choices[0]?.message?.content.trim() || "" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.post('/api/find-references', async (req, res) => {
  try {
    const { term } = req.body;
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Just give a sample list of academic references for this medical term and nothing else. We are in a medical and clinical area. "${term}". Please provide a numbered list of at least 3 references in APA format:`,
        },
      ],
      model: "mixtral-8x7b-32768",
      max_tokens: 100,
      temperature: 0.7,
    });
    res.json({ references: chatCompletion.choices[0]?.message?.content.trim() || "" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));