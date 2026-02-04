"use client";

import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PreviewWrapper = styled.div`
  max-width: 700px;
  margin: 1.5rem auto 2rem;
  padding: 1.6rem 1.8rem;
  border-radius: 18px;
  background: rgba(0, 38, 77, 0.85); /* blu navy scuro semi-trasparente */
  backdrop-filter: blur(6px);
  box-shadow: 0 8px 20px rgba(0, 38, 77, 0.5);
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const PreviewTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: #a2d5f2; /* azzurro chiaro */
`;

const InfoIcon = styled.img<{ open: boolean }>`
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: transform 0.25s ease, opacity 0.2s ease;

  transform: rotate(${({ open }) => (open ? "180deg" : "0deg")});

  &:hover {
    opacity: 0.85;
  }
`;

const PreviewText = styled.p`
  margin-top: 1rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #d9e6f2; /* azzurro chiaro più tenue */
  animation: ${fadeSlide} 0.25s ease;
`;

const Highlight = styled.span`
  font-weight: 600;
  color: gold;
`;

export const MenuPreview = () => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <PreviewWrapper ref={wrapperRef}>
      <PreviewTitle>
        🍽️ Il menu della serata
        <InfoIcon
          open={open}
          src="https://img.icons8.com/fluency/48/collapse-arrow.png"
          alt="Info menu"
          onClick={() => setOpen((prev) => !prev)}
        />
      </PreviewTitle>

      {open && (
        <PreviewText>
          La serata inizia con un antipasto freddo:{" "}
          <Highlight>polpo all’insalata e gamberi in pasta kataifi.</Highlight>
          <br />
          Segue la portata degli antipasti caldi:{" "}
          <Highlight>gratinati misti (capesante, cannolicchi) e {" "}</Highlight>
          <Highlight>moscardini al guazzetto</Highlight>.<br />
          Come primo piatto,{" "}
          <Highlight>risotto allo zafferano con crostacei e lime</Highlight>.
          <br />
          Per il secondo,{" "}
          <Highlight>frittura mista con verdure pastellate</Highlight>.<br />
          Per concludere, <Highlight>dolce della casa</Highlight> e frutta
          fresca:{" "}
          <Highlight>ananas e kiwi</Highlight>.<br />
          Il tutto sarà accompagnato da caffè, amaro e vino{" "}
          <Highlight>Pascorino</Highlight>.
        </PreviewText>
      )}
    </PreviewWrapper>
  );
};
