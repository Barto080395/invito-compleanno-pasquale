import styled, { keyframes } from "styled-components";


const pulseGlow = keyframes`
  0%, 100% { transform: scale(1); box-shadow: 0 0 5px rgba(212, 175, 55, 0.5); }
  50% { transform: scale(1.08); box-shadow: 0 0 20px rgba(212, 175, 55, 0.8); }
`;

const MessageContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["success", "error"].includes(prop)
})<{ success?: boolean; error?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  padding: 1.2rem 2.5rem;
  border-radius: 25px;
  font-weight: 700;
  font-size: 1rem;
  color: ${({ success, error }) => (success ? "#fff" : error ? "#d93025" : "#333")};
  background: ${({ success, error }) =>
    success
      ? "linear-gradient(135deg, #d4af37, #f5e06b, #d4af37)" /* oro tenue */
      : error
      ? "linear-gradient(135deg, #fce8e6, #f8c5c0)" /* mantengo rosso chiaro per error */
      : "#0a2540"}; /* blu scuro neutro */
  box-shadow: ${({ success }) =>
    success ? "0 0 15px rgba(212,175,55,0.6), 0 0 30px rgba(212,175,55,0.4)" : "0 6px 20px rgba(0,0,0,0.15)"};
  animation: ${({ success }) => (success ? pulseGlow : "none")} 1.5s infinite;
  text-align: center;
  border: ${({ success }) => (success ? "1px solid #fff" : "none")};
`;

const Icon = styled.span.withConfig({
  shouldForwardProp: (prop) => !["success", "error"].includes(prop)
})<{ success?: boolean; error?: boolean }>`
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ success, error }) => (success ? "#fff" : error ? "#d93025" : "#f8fafc")};
  text-shadow: ${({ success }) => (success ? "0 0 8px #fff, 0 0 15px rgba(212,175,55,0.6)" : "0 1px 2px rgba(0,0,0,0.2)")};
  animation: ${({ success }) => (success ? "pulse 1.5s infinite" : "none")};
`;


type StatusMessageProps = {
  success?: boolean;
  error?: boolean;
  name?: string;
  surname?: string;
};

export const StatusMessage = ({ success, error, name, surname }: StatusMessageProps) => {
  if (!success && !error) return null;

  return (
    <MessageContainer success={success} error={error}>
      <Icon success={success} error={error}>
        {success ? "✅" : "❌"}
      </Icon>
      {success
        ? `${name} ${surname}, hai confermato con successo! 🎉`
        : "Errore: non è stato possibile confermare la tua presenza."}
    </MessageContainer>
  );
};
