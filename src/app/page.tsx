"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import Home from "./components/Home";


const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Sfondo full-screen
const BackgroundWrapper = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
  z-index: -2;
`;

// Overlay per loader con fade
const LoaderOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background: rgba(255, 230, 240, 0.6);
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  pointer-events: ${(props) => (props.$visible ? "all" : "none")};
  transition: opacity 0.5s ease-in-out;
`;

// Wrapper del loader
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  position: relative;
  animation: ${spin} 1s linear infinite;
`;

// Singoli dots
const Dot = styled.div<{ size: number; angle: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  margin: -${(props) => props.size / 2}px 0 0 -${(props) => props.size / 2}px;
  background-color: ${(props) => props.color || "gold"}; /* oro tenue */
  border-radius: 50%;
  transform: rotate(${(props) => props.angle}deg) translate(25px) rotate(-${(props) => props.angle}deg);
  box-shadow: 0 5px 15px rgba(212, 175, 55, 1d); /* glow oro */
`;

type LoaderProps = {
  duration?: number;
  onComplete?: () => void;
};

const Loader = ({ duration = 1500, onComplete }: LoaderProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  // Dots distribuiti a 72° ciascuno
  const dots = [
    { size: 6, angle: 0 },
    { size: 6, angle: 72 },
    { size: 6, angle: 144 },
    { size: 6, angle: 216 },
    { size: 6, angle: 288 },
  ];

  return (
    <LoaderWrapper>
      {dots.map((dot, i) => (
        <Dot key={i} size={dot.size} angle={dot.angle} />
      ))}
    </LoaderWrapper>
  );
};

const Page = () => {
  const [mounted, setMounted] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Background full-screen */}
      <BackgroundWrapper>
        <Image
          src="/sfondoA.jpg"
          alt="Sfondo festa"
          fill
          style={{ objectFit: "cover" }}
          priority
          onLoadingComplete={() => setImageLoaded(true)}
        />
      </BackgroundWrapper>

      {/* Loader sopra tutto finché l'immagine non è pronta */}
      <LoaderOverlay $visible={!showApp && !imageLoaded}>
        <Loader duration={500} onComplete={() => setShowApp(true)} />
      </LoaderOverlay>

      {/* App principale */}
      {mounted && showApp && <Home />}
    </>
  );
};

export default Page;
