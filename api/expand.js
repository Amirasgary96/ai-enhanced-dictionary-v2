const Groq = require("groq-sdk");

module.exports = async (req, res) => {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  try {
    const { term, definition } = req.body;
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Expand on the definition of "${term}": ${definition}\n\nExpanded explanation:`,
        },
      ],
      model: "mixtral-8x7b-32768",
      max_tokens: 500,
      temperature: 0.7,
    });
    res.json({ expanded: chatCompletion.choices[0]?.message?.content.trim() || "" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};