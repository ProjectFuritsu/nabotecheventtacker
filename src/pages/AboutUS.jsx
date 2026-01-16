import React from "react";
import { Quote, Sparkles, Hammer, Globe } from "lucide-react";

export default function AboutUS() {
  return (
    <>
      <div className="bg-white text-gray-900 font-sans selection:bg-indigo-100">
        {/* 1. THE HOOK: The Vision */}
        <section className="py-24 px-6 lg:py-32 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase px-3 py-1 bg-indigo-50 rounded-full">
                Established 2026
              </span>
              <h1 className="mt-6 text-5xl lg:text-7xl font-light tracking-tight leading-tight">
                It started with a{" "}
                <span className="font-bold italic underline decoration-indigo-500/30">
                  single pixel
                </span>{" "}
                and a big question.
              </h1>
            </div>
            <div className="text-xl text-gray-600 leading-relaxed font-light">
              As the pulse of Panabo City grows, so does the crowd. With tourism
              surging, 'waiting for info' is no longer an option. We saw the
              gap: travelers and locals alike needed a direct, high-speed
              connection to the city's best events. That’s why we built this,{" "}
              <span className="text-black font-medium uppercase text-sm tracking-tighter italic">
                a solution engineered to put the right information in your hands
                exactly when the action starts.
              </span>
            </div>
          </div>
        </section>

        {/* 2. THE CHAPTER: Our Process (The "Design" Focus) */}
        <section className="bg-gray-950 py-24 px-6 overflow-hidden relative">
          {/* Subtle background story-line */}
          <div className="absolute top-0 left-1/2 w-px h-full bg-linear-to-b from-transparent via-white/10 to-transparent"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-white text-3xl font-bold mb-4">
                The way we work is the story we tell.
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                We spent years refining our asset pipelines so that when you
                partner with us, you aren't getting a folder—you're getting a
                legacy.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="group">
                <div className="mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                  <Sparkles className="w-10 h-10" />
                </div>
                <h3 className="text-white text-xl font-bold mb-3">The Spark</h3>
                <p className="text-gray-400 leading-relaxed">
                  As Panabo surges, the "concept" of an event is just the start.
                  We identify the high-energy signal that visitors are looking
                  for to bridge the gap between curiosity and attendance.
                </p>
              </div>

              <div className="group">
                <div className="mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                  <Hammer className="w-10 h-10" />
                </div>
                <h3 className="text-white text-xl font-bold mb-3">
                  The Connection
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  This isn't about folders; it's about friction-less info. We
                  engineer the data flow so tourists get instant, high-fidelity
                  event details the second they need them. No static, just the
                  signal.
                </p>
              </div>

              <div className="group">
                <div className="mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                  <Globe className="w-10 h-10" />
                </div>
                <h3 className="text-white text-xl font-bold mb-3">
                  The Legacy
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  We don't just post links—we build a digital heartbeat. Every
                  visitor leaves with a memory, and every organizer builds a
                  legacy in a city that never stops moving.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. THE PHILOSOPHY: Big Quote */}
        {/* <section className="py-24 px-6 text-center max-w-4xl mx-auto">
          <Quote className="w-12 h-12 text-gray-200 mx-auto mb-8" />
          <p className="text-3xl md:text-4xl font-serif italic text-gray-800 leading-snug">
            "Design for the Surge. Innovate for the Soul. If it doesn't redefine
            the experience, it isn't a NaboTech original.."
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/a/ACg8ocJbqnoPc_9sgQNpC_GxY-MhyEHJByE83b7lOLSOFBniuRvObiQ=s360-c-no"
                alt="Founder"
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900">
                John Fritz C. Capillanes
              </p>
              <p className="text-sm text-gray-500 uppercase tracking-widest">
                Project Lead
              </p>
            </div>
          </div>
        </section> */}

        {/* This is for Partnerships Portion */}
        {/* <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto bg-indigo-600 rounded-4xl p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              Want to be part of the next chapter?
            </h2>
            <p className="text-indigo-100 mb-10 max-w-lg mx-auto text-lg">
              Our story is still being written, and we are looking for partners
              who value craft as much as we do.
            </p>
            <a
              href="/partners"
              className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              Let's Partner Up
            </a>
          </div>
         
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
        </div>
      </section> */}
      </div>

      <footer className="bg-white border-t border-gray-200 ">
        <div className="max-w-screen-xl mx-auto pt-16">
 
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4 mb-12">
            <img
              src="/NaboTechLogo.png"
              className="w-40 mb-6"
              alt="NaboTech Logo"
            />
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
              NaboTech is committed to delivering excellence through innovation.
              Our platform provides the tools you need to build the next
              generation of digital experiences.
            </p>
          </div>
         
        </div>
      </footer>
    </>
  );
}
