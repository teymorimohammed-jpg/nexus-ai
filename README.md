# NEXUS AI

Futuristische deutschsprachige KI-Web-App mit Chat, Browser-Spracherkennung und Sprachausgabe.

## Lokal starten
1. Node.js 20+ installieren.
2. `npm install`
3. `OPENAI_API_KEY` als Umgebungsvariable setzen (niemals committen).
4. `npm start`
5. Browser: `http://localhost:3000`

## Hosting
Für einen Node.js-Host:
- Build command: `npm install`
- Start command: `npm start`
- Environment variable: `OPENAI_API_KEY` = geheimer API-Schlüssel
- Optional: `OPENAI_MODEL` = `gpt-4o-mini`

Das Projekt benötigt einen Node.js-Host. GitHub Pages allein kann den geschützten Server-Endpunkt nicht ausführen.
