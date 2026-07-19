import { useState } from "react";
import { Mail, MessageCircle, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend endpoint for contact yet (out of scope for MVP) —
    // this simply provides UX feedback. Wire up an email service later if needed.
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="px-4 max-w-3xl mx-auto py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Get in Touch</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Questions, feedback, or suggestions? We'd love to hear from you.
        </p>
      </div>

      <div className="glass-strong rounded-3xl p-8 sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl px-4 py-3 glass bg-white/70 dark:bg-white/5 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl px-4 py-3 glass bg-white/70 dark:bg-white/5 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-xl px-4 py-3 glass bg-white/70 dark:bg-white/5 outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
              placeholder="How can we help?"
            />
          </div>
          <button type="submit" className="btn-primary w-full sm:w-auto">
            <Send size={16} /> Send Message
          </button>
          {sent && (
            <p className="text-sm text-green-600 dark:text-green-400 animate-fade-in">
              Thanks for reaching out! We'll get back to you soon.
            </p>
          )}
        </form>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mt-8">
        <div className="glass rounded-2xl p-6 flex items-center gap-4">
          <div className="bg-gradient-to-br from-primary-600 to-purple-600 w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
            <Mail size={18} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm">Email</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">support@genzeeduverse.com</p>
          </div>
        </div>
        <div className="glass rounded-2xl p-6 flex items-center gap-4">
          <div className="bg-gradient-to-br from-primary-600 to-purple-600 w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
            <MessageCircle size={18} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm">Live Chat</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Use our AI Chat for instant help</p>
          </div>
        </div>
      </div>
    </div>
  );
}
