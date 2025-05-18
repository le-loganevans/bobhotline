"use client";

import { useState } from "react";

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: "", suggestion: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("sent");
      setForm({ name: "", suggestion: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white p-6">
      <form onSubmit={handleSubmit} className="bg-white text-black max-w-md w-full p-6 rounded shadow space-y-4">
        <h1 className="text-2xl font-bold mb-4">Send Feedback</h1>

        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Your name"
          className="w-full p-2 border rounded"
        />

        <textarea
          name="suggestion"
          value={form.suggestion}
          onChange={handleChange}
          required
          placeholder="Your suggestion"
          className="w-full p-2 border rounded h-28"
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          {status === "sending" ? "Sending..." : "Submit"}
        </button>

        {status === "sent" && <p className="text-green-600">Thank you! Your feedback has been sent.</p>}
        {status === "error" && <p className="text-red-600">Something went wrong. Please try again.</p>}
      </form>
    </div>
  );
}
