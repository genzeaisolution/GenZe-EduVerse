import groq, { TEXT_MODEL, VISION_MODEL } from "../config/groq.js";
import { SYSTEM_PROMPT } from "../config/systemPrompt.js";

/**
 * Handles a chat completion request.
 * Supports plain text messages and optional image (base64 data URL) for vision.
 * Streams the response back to the client using Server-Sent style chunked transfer.
 */
export const handleChat = async (req, res) => {
  try {
    const { messages, image } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array is required" });
    }

    // Build the conversation history, always led by the education-only system prompt.
    const conversation = [{ role: "system", content: SYSTEM_PROMPT }];

    // Map prior turns (exclude any client-side metadata).
    for (const m of messages) {
      if (m.role === "user" || m.role === "assistant") {
        conversation.push({ role: m.role, content: m.content });
      }
    }

    let model = TEXT_MODEL;

    // If an image is attached to the latest user message, switch to the vision model
    // and reformat the last message as multimodal content.
    if (image) {
      model = VISION_MODEL;
      const lastMsg = conversation[conversation.length - 1];
      conversation[conversation.length - 1] = {
        role: "user",
        content: [
          { type: "text", text: lastMsg.content || "Please analyze this image." },
          { type: "image_url", image_url: { url: image } },
        ],
      };
    }

    // Set headers for streaming plain text chunks to the client.
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Transfer-Encoding", "chunked");

    const stream = await groq.chat.completions.create({
      model,
      messages: conversation,
      temperature: 0.6,
      max_tokens: 2048,
      top_p: 0.9,
      stream: true,
    });

    // Allow client to cancel generation ("Stop" button) by closing the request.
    req.on("close", () => {
      // The underlying stream will be garbage collected once the response ends.
    });

    for await (const chunk of stream) {
      const token = chunk.choices?.[0]?.delta?.content || "";
      if (token) {
        res.write(token);
      }
    }

    res.end();
  } catch (error) {
    console.error("Chat error:", error?.message || error);
    // If headers already sent (mid-stream failure), just end the response.
    if (!res.headersSent) {
      res.status(500).json({
        error: "Failed to get response from AI. Please try again.",
      });
    } else {
      res.end();
    }
  }
};

/**
 * Simple health check endpoint.
 */
export const healthCheck = (req, res) => {
  res.json({ status: "ok", service: "GenZe EduVerse API", timestamp: new Date().toISOString() });
};
