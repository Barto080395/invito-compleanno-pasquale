"use client";

import styled, { keyframes } from "styled-components";
import Countdown from "./Countdown";
import RSVPForm from "./RSVPForm";
import Image from "next/image";
import { ConfettiComponent } from "./Confetto";

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
  0% { box-shadow: 0 0 10px #ff69b4; }
  50% { box-shadow: 0 0 25px #ff1493; }
  100% { box-shadow: 0 0 10px #ff69b4; }
`;


const Container = styled.div`
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
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0);
    z-index: 0;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ff1493;
  text-shadow: 3px 3px 15px rgba(0, 0, 0, 0.5);
  animation: ${bounce} 2s infinite, ${scaleTitle} 3s infinite alternate;
`;

const BigOne = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  font-style: italic; /* corsivo */
  text-decoration: underline; /* sottolineato */
  text-underline-offset: 10px; /* distanza dal testo per renderlo più bello */
  color: #ff1493; /* rosa acceso */
  text-shadow: 0 0 25px rgba(255, 20, 147, 0.8), 0 0 50px rgba(255, 105, 180, 0.6);
  animation: ${bounce} 3s infinite;
`;

export const Message = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  color: #444;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 1.5);
  background: linear-gradient(135deg, #ffd6e0, #ffc0cb, #ffe0b2, #ffd1dc);
`;

const Photo = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #ffb6c1;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  animation: ${pulse} 3s infinite alternate;
  margin: 0 auto; /* forza la centratura */

  img {
    width: 20rem;
    height: 100%;
    object-fit: cover;
    display: block; /* evita spazi strani */
  }
`;

const DateInfo = styled.p`
  font-size: 1.5rem;
  color: #333;
  font-weight: bold;
`;

const CountdownWrapper = styled.div`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ff9de2, #ff1493);
  border-radius: 20px;
  color: #fff;
  font-size: 1.5rem;
  animation: ${glow} 2s infinite alternate;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 1);
`;

const RSVPWrapper = styled.div`
  width: 100%;
  max-width: 400px;
`;

const Location = styled.a`
  font-size: 1.2rem;
  color: #000000ff;
  cursor: pointer;
  background: linear-gradient(135deg, #ffd6e0, #ffc0cb, #ffe0b2, #ffd1dc);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 1.5);
  &:hover {
    color: #ff1493;
    text-decoration: underline;
  }
`;


export default function Home() {
  const targetDate = "2026-01-17T19:00:00";

  return (
    <Container>
      <Title>Il primo compleanno di Rossella! 🥳🎉</Title>
      <Photo>
        <Image src="/rosa.jpeg" alt="Rossella" width={220} height={220} style={{ objectFit: "cover" }} priority />
      </Photo>
      <Message>Vuoi venire al mio primo compleanno? 🎂 Ti aspetto con tanta gioia, non mancare! 💖 Sarà una festa piena di sorrisi e divertimento! ✨</Message>
      <DateInfo>17 Gennaio 2026 alle 19:00</DateInfo>
      <CountdownWrapper>
        <Countdown targetDate={targetDate} />
        <BigOne>1 Anno!! 🎈</BigOne>
      </CountdownWrapper>
      <RSVPWrapper>
        <RSVPForm />
      </RSVPWrapper>
      <Location href="https://www.google.com/maps?q=Via+Roma,+40,+PorticodiCaserta" target="_blank" rel="noopener noreferrer">
        📍 Via Roma, 40, Portico di Caserta
      </Location>
      <ConfettiComponent />
    </Container>
  );
}
