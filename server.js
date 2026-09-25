// server.js
// Simple Express server that serves a static home page and exposes
// an AI-powered API endpoint (/api/ask) using the OpenAI API.

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Health check (useful for Render)
app.get("/healthz", (req, res) => res.status(200).send("ok"));

// AI feature: takes a prompt from the user and returns an AI-generated reply
app.post("/api/ask", async (req, res) => {
  try {
    const userPrompt = (req.body && req.body.prompt || "").toString().trim();

    if (!userPrompt) {
      return res.status(400).json({ error: "Please provide a 'prompt' in the request body." });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error:
          "Server is missing GEMINI_API_KEY. Add it in Render's Environment settings (see README).",
      });
    }

    const model = "gemini-3.8-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: userPrompt }],
          },
        ],
        systemInstruction: {
          parts: [
            {
              text: "You are a friendly, concise assistant embedded in a class demo web app. Keep answers short and clear.",
            },
          ],
        },
        generationConfig: {
          maxOutputTokens: 300,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      return res.status(502).json({ error: "AI service error. Check server logs." });
    }

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "(no response)";

    res.json({ reply });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Something went wrong on the server." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
