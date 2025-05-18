"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

export interface SuggestionModalRef {
  open: () => void;
}

const SuggestionModal = forwardRef<SuggestionModalRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", suggestion: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
  }));

  const closeModal = () => {
    setIsOpen(false);
    setForm({ name: "", email: "", suggestion: "" });
    setStatus("idle");
  };

  useEffect(() => {
    if (status === "sent") {
      const timeout = setTimeout(() => {
        closeModal();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[75%] md:w-full max-w-md relative text-black">
        <button
          onClick={closeModal}
          className="absolute top-2 right-3 text-2xl text-gray-600 hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">💬 Leave a Suggestion</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="w-full p-2 border rounded"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
            required
            type="email"
            className="w-full p-2 border rounded"
          />

          <textarea
            name="suggestion"
            value={form.suggestion}
            onChange={handleChange}
            placeholder="Your suggestion"
            required
            className="w-full p-2 border rounded h-24 resize-none"
          />

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className={`w-full py-2 rounded ${
              status === "sent"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-cyan-700 hover:bg-cyan-800 text-white"
            }`}
          >
            {status === "sending"
              ? "Sending..."
              : status === "sent"
              ? "Sent!"
              : "Submit"}
          </button>

          {status === "sent" && (
            <p className="text-green-600">✅ Sent! Thanks for your feedback.</p>
          )}
          {status === "error" && (
            <p className="text-red-600">❌ Failed to send. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
});

export default SuggestionModal;
