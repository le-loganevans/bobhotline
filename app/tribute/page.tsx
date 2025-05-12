"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AccordionItem from "@/app/components/AccordionItem";


export default function InMemoryPage() {

const [openIndex, setOpenIndex] = useState<number | null>(null);
const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-neutral-950 text-white px-6 py-12 flex flex-col items-center justify-center"
    >
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">In Memory of Bob</h1>
        <p className="text-gray-300 text-lg md:text-xl mb-8">
          Bob was more than just a voice on the line. He was known for his wit, warmth, and unforgettable phrases, Bob brought joy to those around him with every call.
        </p>
        <p className="text-gray-400 mb-6">
          From spontaneous catchphrases like "Horoo..." and "Talking Jargon!" to heartfelt hellos, Bob's hotline became a sanctuary of comfort, laughter, and a little bit of mischief.
        </p>
        <p className="text-gray-400 mb-6">
          Bob lived a life full of stories — late-night chats, early morning rambles, and enough wisdom to fill volumes. His voice lives on through this digital tribute.
        </p>

        {/* 🎥 YouTube Video Embed */}
        <div className="aspect-video w-full mb-10 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/vs0urRCS02k?si=uTCx1mhW8A-Nqth-"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        

        <div className="mt-10 max-w-2xl mx-auto w-full">
        <AccordionItem
            title="✍️ Poem"
            content={
              <div className="text-center whitespace-pre-line text-sm sm:text-base leading-relaxed">
              <strong>For Bob, Who Brought the Sunshine</strong>

              {"\n\n"}We gather here with heavy hearts,{"\n"}
              Yet laughter lingers, love restarts.{"\n"}
              For Bob, whose grin could light the day,{"\n"}
              Whose joy would never fade away.{"\n\n"}

              He lived full throttle, bold and free,{"\n"}
              A soul as deep as any sea.{"\n"}
              From sunny Nelson’s golden glow,{"\n"}
              To Invercargill, on he’d go.{"\n\n"}

              Spencer Park with carnival cheer,{"\n"}
              Amberley campgrounds, good times near.{"\n"}
              Down to Dunedin, cruising the land,{"\n"}
              Chasing blue skies and hot warm sand.{"\n\n"}

              No map could hold the paths he’d roam,{"\n"}
              But every road still led him home.{"\n"}
              Flat white in hand, somehow always free,{"\n"}
              A cheeky grin, and heart full of glee.{"\n\n"}

              He’d crack a line to make you smile,{"\n"}
              Stay for a yarn, stay for a while.{"\n"}
              A father proud, a pop so dear,{"\n"}
              To Logan, Alex, and grandkids near.{"\n\n"}

              And though he’s left this world we see,{"\n"}
              His spirit lives in you and me.{"\n\n"}

              So here’s to Bob — forever bright,{"\n"}
              Still chasing sunsets, still our shining light.
            </div>
            
            }
            isOpen={openIndex === 1}
            onToggle={() => toggle(1)}
          />
        </div>
        
        <AccordionItem
            title="📜 Eulogy Transcript"
            isOpen={openIndex === 0}
            onToggle={() => toggle(0)}
            content={
              <div className="whitespace-pre-line text-left text-sm sm:text-base leading-relaxed space-y-4">
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
                  Another bold memory was Bob's mastery of talking — maybe he missed his calling working as a politician, or he just enjoyed speaking a little jargon. He did however find his calling in the garden and early family farms. This is where Bob practiced multitasking, however, he shortly realised working and talking weren’t completely compatible.
                  His focused mentality meant you should either be prepared for a day of working or a day filled with talking.
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





        <div className="mt-12">
          <a href="/" className="text-cyan-300 hover:underline text-sm">
            ← Back to Hotline
          </a>
        </div>
      </div>
    </motion.div>
  );
}