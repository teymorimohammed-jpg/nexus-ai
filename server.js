import express from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ error: "Der KI-Schlüssel ist auf dem Server noch nicht eingerichtet." });
    }
    const messages = Array.isArray(req.body.messages) ? req.body.messages.slice(-20) : [];
    const safeMessages = messages
      .filter(m => ["user", "assistant"].includes(m.role) && typeof m.content === "string")
      .map(m => ({ role: m.role, content: m.content.slice(0, 6000) }));
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: "Du bist NEXUS AI, ein hilfreicher, ruhiger, souveräner persönlicher KI-Assistent auf Deutsch. Sprich den Nutzer gelegentlich und natürlich mit 'Boss' an, nicht in jedem Satz. Antworte klar und ehrlich. Behaupte niemals, Aktionen ausgeführt zu haben, die du nicht ausgeführt hast. Erfinde keine Live-Daten." },
        ...safeMessages
      ],
      temperature: 0.7
    });
    res.json({ reply: response.choices[0]?.message?.content || "Boss, ich habe gerade keine Antwort erhalten." });
  } catch (err) {
    console.error("NEXUS API error:", err?.message || err);
    res.status(500).json({ error: "Die KI-Verbindung ist fehlgeschlagen. Bitte prüfe die Server-Konfiguration." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`NEXUS AI läuft auf Port ${port}`));
