// app/components/FeedbackFooter.tsx
'use client';

import { useRef } from 'react';
import SuggestionModal, { SuggestionModalRef } from '@/app/components/SuggestionModal';

type Props = { className?: string };

export default function FeedbackFooter({ className = '' }: Props) {
  const modalRef = useRef<SuggestionModalRef>(null);

  return (
    <>
      <div className={`text-center text-[11px] text-zinc-500 space-y-1 ${className}`}>
        <div>v1.0.2509 — Bob Hotline — Designed by lestudio</div>
        <div>
          Feedback?{' '}
          <button
            onClick={() => modalRef.current?.open()}
            className="text-cyan-300 underline hover:text-cyan-200"
          >
            Click here
          </button>
        </div>
      </div>

      <SuggestionModal ref={modalRef} />
    </>
  );
}
