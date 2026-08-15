# Gemini API Worker

This is the secure server-side proxy for GitHub Pages.

Install:
```bash
npm install -g wrangler
wrangler login
```

Set secret:
```bash
wrangler secret put GEMINI_API_KEY
```

Deploy:
```bash
cd worker
wrangler deploy
```

Then use the resulting workers.dev URL as NEXT_PUBLIC_CHAT_API_URL.

The Worker calls Gemini's OpenAI-compatible endpoint, equivalent to:
```python
from openai import OpenAI

client = OpenAI(
    api_key=gemini_api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

response = client.chat.completions.create(
    model="gemini-3.1-flash-lite",
    messages=messages,
)
```
