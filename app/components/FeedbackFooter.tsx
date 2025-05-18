"use client";

import { useRef } from "react";
import SuggestionModal, { SuggestionModalRef } from "@/app/components/SuggestionModal";

export default function FeedbackFooter() {
  const modalRef = useRef<SuggestionModalRef>(null);

  return (
    <>
      <div className="text-center text-xs text-gray-500 mb-16 md:mb-0">
        <div>
          v1.0.2505 — Bob Hotline — Designed by lestudio
        </div>
        <div>
          Feedback?{" "}
          <button
            onClick={() => modalRef.current?.open()}
            className="text-cyan-400 underline hover:text-cyan-300"
          >
            Click Here
          </button>
        </div>
      </div>

      <SuggestionModal ref={modalRef} />
    </>
  );
}
