"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const EnvelopeScene = dynamic(() => import("../components/EnvelopeScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-[#020817] flex items-center justify-center text-slate-200 font-['Montserrat'] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(56,189,248,0.28),transparent_35%),radial-gradient(circle_at_80%_85%,rgba(30,64,175,0.25),transparent_35%),radial-gradient(circle_at_55%_55%,rgba(99,102,241,0.18),transparent_40%)] pointer-events-none" />
      <div className="flex flex-col items-center gap-6 z-10">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-[3px] border-sky-400/40 rounded-full"></div>
          <div className="absolute inset-0 border-[3px] border-transparent border-t-sky-400 border-r-indigo-400 rounded-full animate-spin"></div>
        </div>
        <p className="text-sky-200 text-xs font-bold tracking-[0.35em] uppercase animate-pulse">Opening Portal...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState<"Accepted" | "Rejected" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) setSubmitted(true);
  };

  const handleComplete = (decision?: "Accepted" | "Rejected" | null) => {
    if (decision) setStatus(decision);
    setDone(true);
  };

  if (done) {
    return (
      <div className="w-full h-screen bg-[#01040a] flex flex-col items-center justify-center text-slate-100 font-['Montserrat'] relative overflow-hidden px-4">
        {/* Deep, rich space-like lighting that fades radially */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />
        
        {/* Subtle cinematic edge lighting */}
        <div className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-[300px] bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />

        {/* Ambient background particles natively floating */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          className="absolute inset-0 opacity-40 pointer-events-none"
        >
           <div className="absolute top-[20%] left-[30%] w-[40rem] h-[40rem] bg-indigo-600/10 rounded-full blur-[100px]" />
           <div className="absolute bottom-[20%] right-[30%] w-[35rem] h-[35rem] bg-blue-500/10 rounded-full blur-[100px]" />
        </motion.div>

        {status === "Accepted" ? (
          <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl w-full">
            {/* Glowing animated checkmark icon hanging above the text without boundaries */}
             <motion.div
               initial={{ scale: 0, opacity: 0, y: 50 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.2 }}
               className="mb-14 relative"
             >
                <div className="absolute inset-0 rounded-full bg-blue-400 blur-[40px] opacity-25 animate-pulse" />
                <div className="w-28 h-28 rounded-full border border-blue-400/30 bg-blue-950/60 backdrop-blur-xl flex items-center justify-center relative z-10 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                  <svg className="w-12 h-12 text-blue-300 drop-shadow-[0_0_15px_rgba(96,165,250,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
             </motion.div>

             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.4 }}
               className="text-5xl md:text-7xl lg:text-[6rem] font-black text-center mb-6 tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 drop-shadow-[0_10px_30px_rgba(59,130,246,0.2)]"
             >
               Welcome to Trikon 3.0
             </motion.h1>

             <motion.p 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.6 }}
               className="text-xl md:text-2xl lg:text-3xl text-blue-200/80 text-center font-medium max-w-3xl leading-relaxed"
             >
               Thank you for accepting the invitation, <span className="text-white font-bold">{name}</span>.
             </motion.p>

             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1, delay: 1 }}
               className="mt-20 flex flex-col items-center"
             >
               <span className="text-xs lg:text-sm uppercase tracking-[0.4em] text-blue-400/60 font-semibold mb-3">See You Soon</span>
               <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
             </motion.div>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl w-full">
             <motion.div
               initial={{ scale: 0, opacity: 0, y: 50 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.2 }}
               className="mb-14 relative"
             >
                <div className="absolute inset-0 rounded-full bg-slate-400 blur-[40px] opacity-10 animate-pulse" />
                <div className="w-28 h-28 rounded-full border border-slate-600/30 bg-slate-900/50 backdrop-blur-xl flex items-center justify-center relative z-10 shadow-[0_0_50px_rgba(148,163,184,0.1)]">
                  <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
             </motion.div>

             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.4 }}
               className="text-5xl md:text-7xl lg:text-[6rem] font-black text-center mb-6 tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-2xl"
             >
               Thank you for responding
             </motion.h1>

             <motion.p 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.6 }}
               className="text-xl md:text-2xl lg:text-3xl text-slate-400 text-center font-medium max-w-3xl leading-relaxed"
             >
               We will miss you, <span className="text-slate-200 font-bold">{name}</span>.
             </motion.p>
          </div>
        )}
      </div>
    );
  }

  if (submitted) {
    return <EnvelopeScene name={name} onComplete={handleComplete} />;
  }

  return (
    <div className="w-full min-h-screen bg-[#020817] flex items-center justify-center font-['Montserrat'] relative overflow-hidden px-4 py-8 md:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.28),transparent_30%),radial-gradient(circle_at_80%_75%,rgba(30,64,175,0.24),transparent_32%),radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.16),transparent_45%)]" />
      <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:34px_34px]" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-6xl rounded-[2.2rem] overflow-hidden border border-slate-700/60 shadow-[0_35px_100px_-35px_rgba(2,6,23,0.8)] bg-slate-900/45 backdrop-blur-xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
          <div className="relative p-8 md:p-12 text-white bg-gradient-to-br from-slate-900/95 via-blue-950/95 to-slate-900/95">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_40%)]" />
            <div className="relative">
              <p className="text-xs tracking-[0.38em] uppercase text-white/70 font-semibold">Intellia Presents</p>
              <h1 className="mt-4 text-5xl md:text-7xl font-black leading-[0.95]">
                TRIKON
                <span className="block text-blue-200">3.0</span>
              </h1>

              <div className="mt-7 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 border border-white/20 text-sm font-semibold text-white/90">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                Innovation. Teamwork. Creativity.
              </div>

              <div className="mt-9 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-2xl bg-black/25 border border-white/25 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/70">Date</p>
                  <p className="mt-1 text-sm font-bold">4th-5th April &apos;26</p>
                </div>
                <div className="rounded-2xl bg-black/25 border border-white/25 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/70">Venue</p>
                  <p className="mt-1 text-sm font-bold">Audi 4, Raman Block</p>
                </div>
                <div className="rounded-2xl bg-black/25 border border-white/25 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/70">Time</p>
                  <p className="mt-1 text-sm font-bold">9:00 AM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 bg-slate-900/85">
            <div className="flex items-center gap-3 mb-7">
              <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain drop-shadow-[0_8px_20px_rgba(59,130,246,0.35)]" />
              <div>
                <p className="text-xs tracking-[0.28em] uppercase text-slate-400">Welcome Card</p>
                <p className="text-sm font-semibold text-slate-200">Intellia Family</p>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-slate-100 leading-tight">Tell Us Your Name</h2>
            <p className="mt-2 text-slate-400 text-sm">We will craft your personalized invitation experience.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500 transition-all"
                  placeholder="Type your name here"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!name.trim()}
                className="w-full py-3.5 rounded-2xl text-white font-black tracking-[0.2em] uppercase bg-gradient-to-r from-blue-800 via-indigo-900 to-blue-950 hover:brightness-110 transition-all shadow-lg shadow-blue-900/40 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-700/50"
              >
                Reveal Invitation
              </button>
            </form>

            <p className="mt-6 text-xs text-slate-400">Your details are used only for invitation response tracking.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
