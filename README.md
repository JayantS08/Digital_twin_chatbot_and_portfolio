# Jayant Singh — AI Digital Twin Portfolio

White-background editorial portfolio for free GitHub Pages hosting.

## Architecture

GitHub Pages (static site) -> Cloudflare Worker (secret API proxy) -> Gemini API.

GitHub Pages cannot safely store a Gemini API key or run Python server code.
The included Worker keeps the key server-side.

## Local
```bash
npm install
npm run dev
```

## GitHub Pages
The included GitHub Actions workflow builds the Next.js static export and deploys it.

## Gemini
The Worker uses Gemini's OpenAI-compatible endpoint. Configure:
- GEMINI_API_KEY
- GEMINI_MODEL=gemini-3.1-flash-lite

If that model is unavailable to your Gemini account, change GEMINI_MODEL to a
currently available free/available model.

## PDFs
Put public-safe PDFs in `knowledge/pdfs/`.

Do not commit confidential company documents, proprietary code, internal logs,
credentials, or private information.
