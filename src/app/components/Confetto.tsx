import { useMemo } from "react";
import styled, { keyframes } from "styled-components";

const fall = keyframes`
  0% { transform: translateY(-2rem) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
`;

const ConfettiContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const Confetto = styled.div<{ left: number; delay: number; size: number }>`
  position: absolute;
  top: -2rem;
  left: ${(props) => props.left}%;
  font-size: ${(props) => props.size}rem;
  animation: ${fall} 5s linear infinite;
  animation-delay: ${(props) => props.delay}s;
`;

export const ConfettiComponent = () => {
  const confettiCount = 30;

  const confettiArray = useMemo(
    () =>
      Array.from({ length: confettiCount }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 5,
        size: Math.random() * 1.5 + 0.8,
      })),
    []
  );

  return (
    <ConfettiContainer>
      {confettiArray.map(
        (
          c: any,
          i: number
        ) => (
          <Confetto key={i} left={c.left} delay={c.delay} size={c.size}>
            ✈️
          </Confetto>
        )
      )}
    </ConfettiContainer>
  );
};
