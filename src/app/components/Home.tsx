"use client";

import styled, { keyframes } from "styled-components";
import Countdown from "./Countdown";
import RSVPForm from "./RSVPForm";
import Image from "next/image";
import { ConfettiComponent } from "./Confetto";

/* =======================
   ANIMAZIONI
======================= */

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-15px); }
  60% { transform: translateY(-8px); }
`;

const scaleTitle = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 10px #d4af37; }  /* oro tenue */
  50% { box-shadow: 0 0 25px #d4af37; } /* oro più intenso */
  100% { box-shadow: 0 0 10px #d4af37; }
`;

const bounceNumber = keyframes`
  0%, 50%, 100% { transform: translateY(0); }
  25% { transform: translateY(-10px); }
  75% { transform: translateY(-5px); }
`;

const glowDate = keyframes`
  0% { text-shadow: 0 0 5px #d4af37; }
  50% { text-shadow: 0 0 15px #d4af37; }
  100% { text-shadow: 0 0 5px #d4af37; }
`;

/* =======================
   CONTAINER
======================= */

export const Container = styled.div`
  position: relative;
  text-align: center;
  font-family: "Comic Neue", cursive, sans-serif;
  background-size: cover;
  min-height: 100vh;
  padding: 2rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
`;

/* =======================
   TITLE
======================= */

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #f8fafc; /* bianco soft su sfondo scuro */
  text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.7);
  animation: ${bounce} 2s infinite, ${scaleTitle} 3s infinite alternate;
`;

/* =======================
   BIGONE (60°)
======================= */

export const BigOne = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  font-style: italic;
  text-decoration: underline;
  text-underline-offset: 8px;
  color: #d4af37; /* oro tenue */
  text-shadow: 0 0 10px rgba(212, 175, 55, 0.6),
               0 0 20px rgba(212, 175, 55, 0.4);
  animation: ${bounceNumber} 3s infinite alternate;
`;

/* =======================
   MESSAGE
======================= */

export const Message = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  color: #f8fafc; /* bianco soft */
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  background: rgba(10, 37, 64, 0.6); /* overlay blu scuro semitrasparente */
`;

/* =======================
   PHOTO
======================= */

export const Photo = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #d4af37; /* oro tenue */
  box-shadow: 0 10px 25px rgba(10, 37, 64, 0.7);
  animation: ${pulse} 3s infinite alternate;
  margin: 0 auto;

  img {
    width: 20rem;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

/* =======================
   DATEINFO
======================= */

export const DateInfo = styled.p`
  font-size: 1.7rem;
  color: #d4af37; /* oro tenue */
  font-weight: bold;
  text-shadow: 1px 1px 8px rgba(212, 175, 55, 0.7);
  animation: ${glowDate} 2s infinite alternate;
`;

/* =======================
   COUNTDOWNWRAPPER
======================= */

export const CountdownWrapper = styled.div`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #0a2540, #1e3a8a); /* blu istituzionale */
  border-radius: 20px;
  color: #d4af37; /* oro tenue */
  font-size: 1.5rem;
  animation: ${glow} 2s infinite alternate;
  box-shadow: 0 10px 25px rgba(10, 37, 64, 0.5), 0 5px 15px rgba(212, 175, 55, 0.2);
`;

/* =======================
   RSVPWRAPPER
======================= */

export const RSVPWrapper = styled.div`
  width: 100%;
  max-width: 400px;
`;

/* =======================
   LOCATION
======================= */

export const Location = styled.a`
  font-size: 1.2rem;
  color: #f8fafc; /* bianco soft */
  cursor: pointer;
  background: rgba(10, 37, 64, 0.6); /* overlay blu scuro */
  box-shadow: 0 10px 25px rgba(10, 37, 64, 0.5);

  &:hover {
    color: #d4af37; /* oro tenue */
    text-decoration: underline;
    transform: scale(1.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 10px 25px rgba(10, 37, 64, 0.5), 0 5px 15px rgba(212, 175, 55, 0.2);
  }
`;


export default function Home() {
  const targetDate = "2026-02-26T20:00:00";

  return (
    <Container>
      <Title>60° Compleanno di Pasquale! 🥳🎉</Title>
      <Photo>
        <Image
          src="/sfondoA.jpg"
          alt="Rossella"
          width={220}
          height={220}
          style={{ objectFit: "cover" }}
          priority
        />
      </Photo>
      <Message>
        Ti invito a condividere con me questo compleanno speciale 🎂 Sarà un
        momento importante da vivere insieme, tra ricordi, sorrisi e amicizia.
        La tua presenza mi farebbe davvero piacere! ✨
      </Message>
      <DateInfo>26 Febbraio 2026 ore 20:00</DateInfo>
      <CountdownWrapper>
        <Countdown targetDate={targetDate} />
        <BigOne>60°</BigOne>
      </CountdownWrapper>
      <RSVPWrapper>
        <RSVPForm />
      </RSVPWrapper>
      <Location
        href="https://www.google.com/maps?q=Hosteria+Mamma+Rosa,+81041+Triflisco+CE,+Italia"
        target="_blank"
        rel="noopener noreferrer"
      >
        📍 Hostaria Mamma Rosa, 19, Triflisco (Bellona) CE, Italia
      </Location>
      <ConfettiComponent />
    </Container>
  );
}
