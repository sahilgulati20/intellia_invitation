"use client";

import React, { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html, PresentationControls, Sparkles, Float, RoundedBox, Edges } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { db } from "../lib/firebase";
import { ref, push, set } from "firebase/database";

function InvitationCard({ isOpen, isDecided, name, onAccept, onReject }: any) {
  const cardRef = useRef<THREE.Group>(null);

  const targetZ = isOpen ? 0 : -20;
  const targetY = isOpen ? 0 : -4;
  const targetRotationY = isOpen ? 0 : -Math.PI * 2.5;
  const targetRotationX = isOpen ? 0 : Math.PI;

  useFrame((state, delta) => {
    if (cardRef.current) {
      cardRef.current.position.y = THREE.MathUtils.damp(cardRef.current.position.y, targetY, 3, delta);
      cardRef.current.position.z = THREE.MathUtils.damp(cardRef.current.position.z, targetZ, 4, delta);
      cardRef.current.rotation.y = THREE.MathUtils.damp(cardRef.current.rotation.y, targetRotationY, 4, delta);
      cardRef.current.rotation.x = THREE.MathUtils.damp(cardRef.current.rotation.x, targetRotationX, 4, delta);
    }
  });

  const cardMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: 0x0b1220,
      metalness: 0.45,
      roughness: 0.25,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.92,
    });
  }, []);

  return (
    <group ref={cardRef} position={[0, -4, -20]} rotation={[Math.PI, -Math.PI * 2.5, 0]}>
      {/* Outer Holographic Glass Card */}
      <RoundedBox args={[8.4, 6.2, 0.1]} radius={0.3} smoothness={8}>
        <primitive object={cardMaterial} attach="material" />
        <Edges scale={1.01} threshold={15} color="#fbbf24" opacity={0.6} />
      </RoundedBox>

      {/* Internal crisp aesthetic layer with premium rose-gold shift */}
      <RoundedBox args={[8.2, 6.0, 0.12]} radius={0.28} smoothness={8}>
        <meshPhysicalMaterial
          color="#0f172a"
          roughness={0.3}
          metalness={0.25}
          clearcoat={0.35}
          clearcoatRoughness={0.35}
        />
        <Edges scale={1} threshold={15} color="#fcd34d" opacity={0.4} />
      </RoundedBox>

      {/* The UI Overlay attached to the card */}
      <Html transform position={[0, 0, 0.08]} scale={0.24} center zIndexRange={[100, 0]}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.6, type: "spring", bounce: 0.4 }}
              className="relative flex flex-col items-center justify-center p-8 md:p-10 bg-slate-900/78 backdrop-blur-2xl rounded-[2.5rem] w-95 sm:w-125 md:w-145 border border-slate-700/70 shadow-[0_24px_70px_-20px_rgba(2,6,23,0.6)] font-['Montserrat'] overflow-hidden"
            >
              {/* Decorative premium glow spots */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400/25 rounded-full blur-[90px] pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-400/25 rounded-full blur-[90px] pointer-events-none" />

              {/* Soft grain-like layered shape for a premium paper feel */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.16),transparent_38%),radial-gradient(circle_at_80%_78%,rgba(99,102,241,0.16),transparent_40%)] pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.85, delay: 0.85, ease: "easeOut" }}
                className="flex flex-col items-center mb-5 md:mb-6 z-10"
              >
                <img
                  src="/logo.png"
                  alt="Trikon Logo"
                  className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_12px_24px_rgba(251,191,36,0.25)]"
                />

                <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-[0.22em] uppercase text-center leading-none">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-400">TRIKON</span>
                  <span className="ml-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-amber-400">3.0</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="h-0.5 bg-gradient-to-r from-transparent via-slate-500 to-transparent mb-8 z-10 w-3/4"
              />

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="relative text-slate-200 mb-8 md:mb-10 text-center text-sm md:text-base leading-relaxed px-4 space-y-5 flex flex-col items-center z-10"
              >
                <p className="text-xl">Dear <strong className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400 font-bold">{name}</strong>,</p>
                <p className="text-slate-300 max-w-[90%] mx-auto font-medium">
                  Intellia has always been more than a society… it&apos;s a family that grows with every generation. ❤️
                </p>
                <p className="text-slate-300 max-w-[90%] mx-auto font-medium">
                  From the days when you were seniors to seeing your juniors guide their super juniors, we are carrying forward everything you taught us. ✨
                </p>
                <p className="text-slate-300 max-w-[90%] mx-auto font-medium">
                  We wholeheartedly invite you to join us at <strong className="text-amber-300 font-semibold">TRIKON 3.0</strong>, from 9 a.m. onwards on 4th April and relive the memories, and celebrate this beautiful journey together.
                </p>
                <p className="text-slate-300 max-w-[90%] mx-auto font-medium">
                  No matter where life takes you, Intellia will always be a part of you… and you will always be a part of Intellia. 🥹🤍
                </p>

              </motion.div>

              {!isDecided ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  className="flex w-full gap-4 justify-center z-10 px-4"
                >
                  <button
                    onClick={onAccept}
                    className="relative flex-2 py-4 bg-blue-700 text-white rounded-2xl font-black transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] tracking-[0.2em] text-xs md:text-sm overflow-hidden group shadow-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">ACCEPT INVITATION</span>
                  </button>
                  <button
                    onClick={onReject}
                    className="flex-1 py-4 bg-slate-800/70 border border-slate-600 text-slate-200 hover:text-rose-300 hover:border-rose-300/40 hover:bg-slate-800 rounded-2xl font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] tracking-[0.2em] text-xs md:text-sm"
                  >
                    DECLINE
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", bounce: 0.6 }}
                  className="py-5 px-8 w-full bg-gradient-to-r from-blue-900/80 to-indigo-900/80 backdrop-blur-xl rounded-2xl flex flex-col items-center justify-center gap-3 border border-blue-400/30 z-10 shadow-md relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[size:250%_250%,100%_100%] animate-[shimmer_2s_infinite]" />
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-400 to-cyan-300 flex items-center justify-center text-slate-900 shadow-lg z-10">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-blue-200 font-black text-sm md:text-lg tracking-[0.3em] uppercase z-10 mt-1">Status Verified</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Html>
    </group>
  );
}

export default function EnvelopeScene({ name, onComplete }: { name: string, onComplete?: (status: "Accepted" | "Rejected") => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDecided, setIsDecided] = useState(false);
  const [status, setStatus] = useState<"Accepted" | "Rejected" | null>(null);

  React.useEffect(() => {
    if (name) {
      setTimeout(() => setIsOpen(true), 500);
    }
  }, [name]);

  const handleDecision = async (decision: "Accepted" | "Rejected") => {
    setIsDecided(true);
    setStatus(decision);
    try {
      const newInviteRef = push(ref(db, "trikon_3_0_Invitations"));
      await set(newInviteRef, {
        name,
        status: decision,
        timestamp: Date.now()
      });
      setTimeout(() => {
        if (onComplete) onComplete(decision);
      }, 600);
    } catch (e: any) {
      console.error("Firebase Details:", e);
      setTimeout(() => {
        if (onComplete) onComplete(decision);
      }, 600);
    }
  };

  return (
    <div className="w-full h-screen bg-[#020817] absolute inset-0 z-10 overflow-hidden">
      {/* Deep aurora background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(56,189,248,0.25),transparent_34%),radial-gradient(circle_at_82%_82%,rgba(30,64,175,0.24),transparent_36%),radial-gradient(circle_at_55%_52%,rgba(99,102,241,0.18),transparent_45%)] pointer-events-none"></div>

      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:50px_50px] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none opacity-40 animate-[pulse_4s_ease-in-out_infinite]" />

      <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.9} color="#dbeafe" />

          {/* Dramatic lighting setup */}
          <spotLight position={[8, 12, 5]} intensity={2.1} color="#60a5fa" angle={0.6} penumbra={1} castShadow />
          <spotLight position={[-8, 5, 5]} intensity={1.7} color="#1d4ed8" angle={0.8} penumbra={1} />
          <pointLight position={[0, -2, 5]} intensity={1.1} color="#93c5fd" distance={20} />

          {/* Holographic floating particles */}
          <Sparkles count={60} scale={12} size={3} speed={0.2} opacity={0.55} color="#60a5fa" />
          <Sparkles count={50} scale={12} size={2} speed={0.35} opacity={0.45} color="#38bdf8" />
          <Sparkles count={30} scale={8} size={4} speed={0.55} opacity={0.5} color="#a5b4fc" noise={2} />

          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 12, Math.PI / 12]}
            azimuth={[-Math.PI / 6, Math.PI / 6]}
          >
            <Float speed={2.5} rotationIntensity={0.1} floatIntensity={0.3} floatingRange={[-0.1, 0.1]}>
              <InvitationCard
                isOpen={isOpen}
                isDecided={isDecided}
                name={name}
                onAccept={() => handleDecision("Accepted")}
                onReject={() => handleDecision("Rejected")}
              />
            </Float>
          </PresentationControls>

          {/* Stable bottom shadow drop - won't flicker like ContactShadows bounds */}
          <mesh position={[0, -3.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[15, 15]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.05} depthWrite={false} />
          </mesh>

          {/* Minimal clean particles */}
          <Sparkles count={40} scale={12} size={2} speed={0.2} opacity={0.2} color="#94a3b8" />

          {status === "Accepted" && (
            <Sparkles count={150} scale={10} size={8} speed={0.8} opacity={1} color="#3b82f6" />
          )}

          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
