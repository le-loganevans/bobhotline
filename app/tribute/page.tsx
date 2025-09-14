'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AccordionItem from '@/app/components/AccordionItem';

export default function InMemoryPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        relative z-10 min-h-dvh
        flex items-center justify-center
        px-6 py-16 md:py-24
        text-white
      "
    >
      <section
        className="
          w-full max-w-3xl
          rounded-3xl border border-white/10
          bg-white/5 backdrop-blur-xl
          shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
          px-5 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12
        "
      >
        {/* Hero */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-wide text-zinc-300/90">
            <span className="inline-block size-2 rounded-full bg-cyan-300" />
            Tribute
          </div>

          <h1
            className="
              mt-4 text-4xl md:text-6xl font-black tracking-tight
              bg-gradient-to-b from-white to-zinc-300/80 bg-clip-text text-transparent
            "
          >
            In Memory of Bob
          </h1>

          <p className="mt-4 text-zinc-300/90 text-base md:text-lg max-w-2xl mx-auto">
            Bob was more than a voice on the phone—his charm, warmth, and
            unforgettable phrases brought joy with every call.
          </p>
        </div>

        {/* Video */}
        <div className="aspect-video w-full mb-8 md:mb-10 overflow-hidden rounded-2xl ring-1 ring-white/15 shadow-[0_6px_30px_-10px_rgba(0,0,0,0.6)]">
          <iframe
            src="https://www.youtube.com/embed/vs0urRCS02k?si=uTCx1mhW8A-Nqth-"
            title="In Memory of Bob — Tribute"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Intro copy */}
        <div className="prose prose-invert max-w-none prose-p:my-0">
          <p className="text-zinc-300/90 text-base md:text-lg">
            From spontaneous catchphrases like <em>“Horoo…”</em> and
            <em> “Talking Jargon!”</em> to heartfelt hellos, Bob’s hotline became a
            place of comfort, laughter, and a little mischief.
          </p>
          <p className="text-zinc-400 mt-4">
            He lived a life full of stories—late-night chats, early-morning rambles,
            and enough wisdom to fill volumes. His voice lives on through this
            digital tribute.
          </p>
        </div>

        {/* Divider */}
        <div className="my-8 md:my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Accordions */}
        <div className="space-y-4">
          <AccordionItem
            title="📜 Eulogy Transcript"
            isOpen={openIndex === 0}
            onToggle={() => toggle(0)}
            content={
              <div className="text-left text-sm sm:text-base leading-relaxed space-y-4 text-zinc-200">
                <p>
                  Kia ora and welcome. It’s a privilege to be here with you all today, celebrating the life of Robert John Evans — or as we knew him, Bob. Today is not just about saying goodbye; it’s about honouring someone who, through every chapter of his life, gave us unforgettable experiences — the kind that stayed with us, that helped shape us to who we are today.
                </p>
                <p>
                  Bob’s story began on the 10th of September, 1966, born to the late Peter and Betty, while also growing up alongside his brothers, Richard and Lenny. Even as a young boy, Bob had a special gift that turned ordinary moments into extraordinary memories.
                </p>
                <p>
                  Some of these early memories were made whilst living at Momorangi Crescent, where the first self-driving tractor was discovered, which somehow managed to drive itself into nearby creeks, and where bikes would mysteriously disappear, only to reappear again just as quickly. These moments built the foundation of Bob’s mischievous character — but they also revealed something more: a life filled with laughter, jokes, and spontaneous adventure.
                </p>
                <p>
                  Another bold memory was Bob's mastery of talking — maybe he missed his calling working as a politician, or he just enjoyed speaking a little jargon. He did however find his calling in the garden and early family farms. This is where Bob practiced multitasking, however, he shortly realised working and talking weren’t completely compatible. His focused mentality meant you should either be prepared for a day of working or a day filled with talking.
                </p>
                <p>
                  As he grew up, so too did his sense of adventure — and his sense of heart. Leaving the family home, he quickly found the freedoms of the world — Palladium and Firehouse just to name a few. But he didn't just chase the excitement of early adulthood — it was the connections he desired to make with people. The same connection he made with us. It was about friendships. It was about love. It was all of life’s lessons which he took with a grin and the occasional shrug.
                </p>
                <p>
                  It was during these years that Bob first experienced what he described as “love at first sight,” marrying former wife, Rachel, in 1994. Together, they created what he described as his greatest joy in life — his sons, Alex and Logan.
                </p>
                <p>
                  Bob’s way of inspiring experiences didn’t stop once he became a father. If anything, it deepened. He showed his boys that life wasn’t about perfection — it was about enjoying the journey that life gave you. Life for Bob was about being present. About finding joy, even when things weren't perfect. He was the one who would spontaneously show up, who would share his endless stories, share his laugh, or just sit with you and share a ray of sunshine — although, this experience of sitting in silence was never really Bob’s style.
                </p>
                <p>
                  Later in life, he also continued his enjoyment of gardening and cleaning. He was fortunate enough to have worked for the Silvesters, Paul, and John, just to name a few. Work was also juggled between his cross-country adventures, which sometimes interfered with his spontaneous mid-week camping trips.
                </p>
                <p>
                  His adventures were vast — whether just visiting friends in town, or weeklong trips to Dunedin or Nelson. He was always busy with a list he would have to prioritise. These memorable journeys and list of adventures, however, became a lot shorter due to declining health. Yet, he still ventured across the country, visiting family and friends in Kaikoura and Greymouth, or sometimes just to the bakery down the road to sneak a custard square and a couple gallons of strawberry milk.
                </p>
                <p>
                  During this time, Bob was spoilt with the gift of becoming a grandfather to Parker and Eden — who brought a new light into his world. Even though his time as a proud grandfather was short, he still maximised it and approached it with open arms and an open heart.
                </p>
                <p>
                  Bob’s life demonstrates how he didn’t just tell you how to live it — he showed you. Even when he faced his final adventures with us, he still showed perseverance and optimism. He showed us that stories are made not from the grand moments, but that of the small ones too — the ones you don't realise are important until you're smiling about them years later.
                </p>
                <p>
                  This inspiring experience of Bob’s life is one to cherish. Uphold his influence and gift a smile, a laugh, or even a hug.
                </p>
                <p>
                  So, as we conclude Bob’s life in words, it’s not truly goodbye. Because Bob’s spirit — his way of turning life into something richer, funnier, and fuller of love — stays with us. So instead, we all bid you farewell. We only wish you safe travels and hope you return when you’re ready to talk about all your new experiences.
                </p>
              </div>
            }
          />

          <AccordionItem
            title="✍️ Poem"
            isOpen={openIndex === 1}
            onToggle={() => toggle(1)}
            content={
              <div className="text-center whitespace-pre-line text-sm sm:text-base leading-relaxed text-zinc-200">
                <strong className="block text-white/90">For Bob, Who Brought the Sunshine</strong>
                {'\n\n'}We gather here with heavy hearts,{'\n'}
                Yet laughter lingers, love restarts.{'\n'}
                For Bob, whose grin could light the day,{'\n'}
                Whose joy would never fade away.{'\n\n'}
                He lived full throttle, bold and free,{'\n'}
                A soul as deep as any sea.{'\n'}
                From sunny Nelson’s golden glow,{'\n'}
                To Invercargill, on he’d go.{'\n\n'}
                Spencer Park with carnival cheer,{'\n'}
                Amberley campgrounds, good times near.{'\n'}
                Down to Dunedin, cruising the land,{'\n'}
                Chasing blue skies and hot warm sand.{'\n\n'}
                No map could hold the paths he’d roam,{'\n'}
                But every road still led him home.{'\n'}
                Flat white in hand, somehow always free,{'\n'}
                A cheeky grin, and heart full of glee.{'\n\n'}
                He’d crack a line to make you smile,{'\n'}
                Stay for a yarn, stay for a while.{'\n'}
                A father proud, a pop so dear,{'\n'}
                To Logan, Alex, and grandkids near.{'\n\n'}
                And though he’s left this world we see,{'\n'}
                His spirit lives in you and me.{'\n\n'}
                So here’s to Bob — forever bright,{'\n'}
                Still chasing sunsets, still our shining light.
              </div>
            }
          />
        </div>

        {/* Footer actions */}
        <div className="mt-10 flex justify-center">
          <a
            href="/"
            className="
              inline-flex items-center gap-2 rounded-xl
              border border-cyan-400/40 bg-cyan-400/10
              px-4 py-2 text-sm font-medium text-cyan-200
              hover:bg-cyan-400/15 hover:border-cyan-300/50
              focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60
              transition
            "
          >
            ← Back to Hotline
          </a>
        </div>
      </section>
    </motion.main>
  );
}
