import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.js";
import { chatRateLimiter } from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow configuring multiple comma-separated origins for CORS.
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Increased body limit to allow base64 image uploads for vision requests.
app.use(express.json({ limit: "10mb" }));

app.use("/api", chatRateLimiter, chatRoutes);

app.get("/", (req, res) => {
  res.json({ message: "GenZe EduVerse API is running 🚀" });
});

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`GenZe EduVerse backend running on port ${PORT}`);
});
