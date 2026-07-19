# 🎓 GenZe EduVerse

**"Your AI Learning Companion"**

An AI-powered education assistant for students. Ask questions across any academic subject — Math, Science, Programming, Business, History and more — and get fast, accurate, well-formatted answers powered by Groq's ultra-fast inference. Not a general chatbot — focused strictly on education.

---

## ✨ Features

- 🤖 **AI Chat** with streaming responses, Markdown rendering, and syntax-highlighted code blocks
- 🖼️ **Image Upload** — analyze math problems, handwritten notes, diagrams, and screenshots (Groq Vision)
- 🌗 **Dark / Light Mode** with system preference detection
- 💬 **Multi-chat sidebar** — new chat, switch chats, delete chats (saved to localStorage)
- ⏹️ **Stop generation**, 🔄 **Regenerate response**, 📋 **Copy message/code**, 🧹 **Clear chat**
- 🎨 Modern glassmorphism UI, inspired by Apple + ChatGPT
- ⚡ Fast, lazy-loaded, reusable-component React architecture
- 🔒 Backend proxy — your Groq API key is never exposed to the browser

## 🧱 Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | React + Vite + Tailwind CSS          |
| Backend    | Node.js + Express                    |
| AI         | Groq API (`groq-sdk`)                |
| Database   | None (stateless MVP; chats in browser localStorage) |
| Auth       | None (v1.0 MVP)                      |
| Frontend Hosting | Cloudflare Pages               |
| Backend Hosting  | Render                          |

## 📁 Project Structure

```
genze-eduverse/
├── backend/
│   ├── config/
│   │   ├── groq.js              # Groq client + model config
│   │   └── systemPrompt.js      # Education-only system prompt
│   ├── controllers/
│   │   └── chatController.js    # Chat + vision streaming logic
│   ├── middleware/
│   │   └── rateLimiter.js       # Basic abuse protection
│   ├── routes/
│   │   └── chat.js              # /api/chat, /api/health
│   ├── server.js                # Express app entry point
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── components/          # Navbar, Footer, ChatSidebar, ChatMessage, etc.
    │   ├── context/
    │   │   └── ThemeContext.jsx # Dark/light mode
    │   ├── pages/                # Home, About, Contact, Chat
    │   ├── utils/
    │   │   └── api.js           # Streaming fetch helper to backend
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── tailwind.config.js
    ├── vite.config.js
    ├── package.json
    └── .env.example
```

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- A free Groq API key → [console.groq.com](https://console.groq.com)

### 1. Clone & install

```bash
git clone <your-repo-url> genze-eduverse
cd genze-eduverse
```

### 2. Backend setup

```bash
cd backend
cp .env.example .env
# Edit .env and paste your GROQ_API_KEY
npm install
npm run dev        # starts on http://localhost:5000
```

### 3. Frontend setup

Open a second terminal:

```bash
cd frontend
cp .env.example .env
# VITE_API_URL should point to your backend (default http://localhost:5000)
npm install
npm run dev         # starts on http://localhost:5173
```

Visit **http://localhost:5173** 🎉

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable            | Description                                   | Default                        |
|----------------------|------------------------------------------------|---------------------------------|
| `GROQ_API_KEY`       | Your Groq API key (**required**)               | —                                |
| `PORT`               | Backend server port                            | `5000`                          |
| `CLIENT_ORIGIN`      | Allowed CORS origin(s), comma-separated        | `http://localhost:5173`         |
| `GROQ_TEXT_MODEL`    | Groq model for text chat                       | `llama-3.3-70b-versatile`       |
| `GROQ_VISION_MODEL`  | Groq model for image analysis                  | `llama-3.2-90b-vision-preview`  |

### Frontend (`frontend/.env`)

| Variable        | Description                  | Default                    |
|------------------|-------------------------------|------------------------------|
| `VITE_API_URL`   | URL of the backend API        | `http://localhost:5000`     |

## ☁️ Deployment

### Backend → Render

1. Push this repo to GitHub.
2. On [Render](https://render.com), create a new **Web Service**, point it at the `backend` folder (root directory: `backend`).
3. Build command: `npm install` — Start command: `npm start`.
4. Add environment variables from the table above (`GROQ_API_KEY` is required; set `CLIENT_ORIGIN` to your deployed frontend URL).
5. Deploy — note the resulting URL (e.g. `https://genze-eduverse-api.onrender.com`).

### Frontend → Cloudflare Pages

1. On [Cloudflare Pages](https://pages.cloudflare.com), create a project from your GitHub repo.
2. Root directory: `frontend`.
3. Build command: `npm run build` — Output directory: `dist`.
4. Add environment variable `VITE_API_URL` = your Render backend URL.
5. Deploy. Cloudflare Pages auto-handles SPA routing via the included `_redirects` file.

## 🧠 AI Behavior

The backend prepends a strict **education-only system prompt** (see `backend/config/systemPrompt.js`) to every request, keeping GenZe EduVerse focused on academic help — Math, Science, Programming, Business, Economics, History, English, and General Knowledge — and politely redirecting off-topic requests.

## 🗺️ Roadmap (Post v1.0)

- Optional authentication + cloud-synced chat history
- Subject-specific quick-prompt suggestions
- Export chat as PDF/notes
- Voice input

## 📄 License

MIT
