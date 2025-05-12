"use client";

import React from "react";

interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AccordionItem({
  title,
  content,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="mb-4 border border-gray-700 rounded">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3 bg-neutral-800 text-white font-semibold hover:bg-neutral-700 transition"
      >
        {title}
      </button>
      {isOpen && (
        <div className="px-4 py-3 bg-neutral-900 text-gray-300">{content}</div>
      )}
    </div>
  );
}
