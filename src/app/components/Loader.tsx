"use client";

import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Animazione rotazione
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Wrapper centrato
const LoaderWrapper = styled.div<{ bgColor?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${(props) => props.bgColor || "#0a2540"}; /* blu scuro */
`;

// Cerchio che contiene i dots
const Spinner = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
`;

// I singoli pallini
const Dot = styled.div<{ size: number; angle: number; color?: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  margin: -${(props) => props.size / 2}px 0 0 -${(props) => props.size / 2}px;
  background-color: ${(props) => props.color || "#d4af37"}; /* oro tenue */
  border-radius: 50%;
  transform: rotate(${(props) => props.angle}deg) translate(20px) rotate(-${(props) => props.angle}deg);
  box-shadow: 0 5px 15px rgba(212, 175, 55, 0.6); /* ombra oro soft */
`;


type LoaderProps = {
  bgColor?: string;
  dotColor?: string;
  duration?: number;
  onComplete?: () => void;
};

const Loader = ({ bgColor, dotColor, duration = 1500, onComplete }: LoaderProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  // Dots con dimensione crescente
  const dots = [
    { size: 4, angle: 0 },
    { size: 6, angle: 72 },
    { size: 8, angle: 144 },
    { size: 10, angle: 216 },
    { size: 12, angle: 288 },
  ];

  return (
    <LoaderWrapper bgColor={bgColor}>
      <Spinner>
        {dots.map((dot, i) => (
          <Dot key={i} size={dot.size} angle={dot.angle} color={dotColor} />
        ))}
      </Spinner>
    </LoaderWrapper>
  );
};

export default Loader;
