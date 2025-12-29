"use client";

import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { ConfettiComponent } from "../components/Confetto";
import { StatusMessage } from "../components/Message";
import Link from "next/link";
import Rocket from "../components/Rocket";

// Animazione gradienti
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffd6e0, #ffc0cb, #ffe0b2, #ffd1dc);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #ff1493;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 700px;
  width: 100%;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 15px;
  background: linear-gradient(135deg, #ffd6e0, #ffc0cb, #ffe0b2, #ffd1dc);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 1.5);
  transition: all 0.3s ease;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem; /* aumenta lo spazio tra label e input */
  margin-bottom: 1rem; /* distanza tra i field */
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1rem;
  color: #e92b8aff;
  margin-left: 10px;
`;

const Input = styled.input`
  padding: 0.85rem 1rem;
  border-radius: 14px;
  border: 2px solid #ffb6c1;
  font-size: 1rem;
  outline: none;
  transition: all 0.25s ease;

  &:focus {
    border-color: #ff1493;
    box-shadow: 0 5px 15px rgba(255, 20, 147, 0.3);
  }
`;

//appearance: none; toglie tutti default di stile della select
const Select = styled.select`
  padding: 0.85rem 1rem;
  border-radius: 14px;
  border: 2px solid #ffb6c1;
  font-size: 1rem;
  outline: none;
  transition: all 0.25s ease;

  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 2rem;

  &:focus {
    border-color: #ff1493;
    box-shadow: 0 5px 15px rgba(255, 20, 147, 0.3);
  }
`;

const Textarea = styled.textarea`
  padding: 1rem;
  border-radius: 14px;
  border: 2px solid #ffb6c1;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  outline: none;
  transition: all 0.25s ease;

  &:focus {
    border-color: #ff1493;
    box-shadow: 0 5px 15px rgba(255, 20, 147, 0.3);
  }
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem; /* spazio tra i bottoni */
  width: 100%;
`;

const Button = styled.button`
  position: relative; /* 🔥 fondamentale per il posizionamento del razzo */
  overflow: visible;  /* assicura che il razzo non venga tagliato */
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.7rem 0.9rem;
  border-radius: 16px;
  border: none;
  background: linear-gradient(45deg, #ff69b4, #ff1493, #ff85b1, #ff69b4);
  background-size: 400% 400%;
  color: #fff;
  font-weight: 700;
  width: 100%;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5), inset 0 -3px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.6),
      inset 0 -3px 8px rgba(0, 0, 0, 0.3);
  }
`;


const ButtonRemove = styled.button`
  padding: 0.7rem 1.5rem;
  border-radius: 16px;
  border: none;
  background: linear-gradient(45deg, #ff69b4, #ff1493, #ff85b1, #ff69b4);
  background-size: 400% 400%;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5), inset 0 -3px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.6),
      inset 0 -3px 8px rgba(0, 0, 0, 0.3);
  }
`;

const ParticipantCard = styled.div`
  border: 1px solid #ffb6c1;
  border-radius: 14px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 5px 20px rgba(255, 20, 147, 1);
`;

export type Partecipante = {
  id: number;
  name: string;
  surname: string;
  tipo: "Adulto" | "Bambino";
  menu: string;
  intolerance: string;
};

export default function FormPage() {
  const [partecipanti, setPartecipanti] = useState<Partecipante[]>([
    {
      id: 1,
      name: "",
      surname: "",
      tipo: "Adulto",
      menu: "Standard",
      intolerance: "Nessuna",
    },
  ]);
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  // Poi usa un useEffect che scrolla quando confermato o errore
  useEffect(() => {
    if ((confirmed || error) && statusRef.current) {
      statusRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [confirmed, error]);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handlePartecipanteChange = (
    id: number,
    field: keyof Partecipante,
    value: any
  ) => {
    setPartecipanti((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const addPartecipante = (tipo: "Adulto" | "Bambino") => {
    setPartecipanti((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        surname: "",
        tipo,
        menu: tipo === "Bambino" ? "Bambini" : "Standard",
        intolerance: "Nessuna",
      },
    ]);
  };

  const removePartecipante = (id: number) => {
    setPartecipanti((prev) => prev.filter((p) => p.id !== id));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Mostra il razzo prima di inviare
  setIsLaunching(true);

  // Attendi 1 secondo per dare tempo all'animazione
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ partecipanti, notes }),
    });

    if (!res.ok) throw new Error("Errore nella conferma");

    setConfirmed(true);
    setError(false);
  } catch (err) {
    console.error(err);
    setError(true);
    setConfirmed(false);
  } finally {
    setIsLaunching(false); // ferma il razzo
  }
};


  return (
    <Container>
      {(confirmed || error) && (
        <div ref={statusRef}>
          <StatusMessage
            success={confirmed}
            error={error}
            name={confirmed ? partecipanti[0].name : undefined}
            surname={confirmed ? partecipanti[0].surname : undefined}
          />
        </div>
      )}
      {!confirmed && !error && (
        <Form onSubmit={handleSubmit}>
          <Title>Conferma la tua presenza 🎉</Title>
          {partecipanti.map((p) => (
            <ParticipantCard key={p.id}>
              <Field>
                <Label>Nome 👤</Label>
                <Input
                  type="text"
                  placeholder="Mario"
                  value={p.name}
                  onChange={(e) =>
                    handlePartecipanteChange(p.id, "name", e.target.value)
                  }
                  required
                />
              </Field>

              <Field>
                <Label>Cognome 🏷️</Label>
                <Input
                  type="text"
                  placeholder="Rossi"
                  value={p.surname}
                  onChange={(e) =>
                    handlePartecipanteChange(p.id, "surname", e.target.value)
                  }
                  required
                />
              </Field>

              <Field>
                <Label>Tipologia di menù 🍽️</Label>
                <Select
                  value={p.menu}
                  onChange={(e) =>
                    handlePartecipanteChange(p.id, "menu", e.target.value)
                  }
                >
                  {p.tipo === "Bambino" ? (
                    <option value="Bambini">Bambini</option>
                  ) : (
                    <>
                      <option value="Standard">Standard</option>
                      <option value="Vegetariano">Vegetariano</option>
                      <option value="Vegano">Vegano</option>
                      <option value="Senza glutine">Senza glutine</option>
                      <option value="Celiaco">Celiaco</option>
                      <option value="Senza latticini">Senza latticini</option>
                    </>
                  )}
                </Select>
              </Field>

              <Field>
                <Label>Intolleranze ⚠️</Label>
                <Select
                  value={p.intolerance}
                  onChange={(e) =>
                    handlePartecipanteChange(
                      p.id,
                      "intolerance",
                      e.target.value
                    )
                  }
                >
                  <option value="Nessuna">Nessuna</option>
                  <option value="Glutine">Glutine</option>
                  <option value="Lattosio">Lattosio</option>
                  <option value="Frutta secca">Frutta secca</option>
                  <option value="Crostacei">Crostacei</option>
                  <option value="Pesce">Pesce</option>
                  <option value="Uova">Uova</option>
                  <option value="Soia">Soia</option>
                  <option value="Arachidi">Arachidi</option>
                </Select>
              </Field>

              {partecipanti.length > 1 && (
                <ButtonRemove
                  type="button"
                  onClick={(e) => {
                    const card = (e.currentTarget as HTMLButtonElement).closest(
                      "div"
                    );
                    removePartecipante(p.id);

                    // scrolla al prossimo partecipante rimasto
                    const nextCard =
                      card?.nextElementSibling as HTMLElement | null;
                    if (nextCard) {
                      nextCard.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                >
                  Rimuovi
                </ButtonRemove>
              )}
            </ParticipantCard>
          ))}

          <ButtonGrid>
            <Button type="button" onClick={() => addPartecipante("Adulto")}>
              ➕ Adulto
            </Button>
            <Button type="button" onClick={() => addPartecipante("Bambino")}>
              ➕ Bambino
            </Button>
          </ButtonGrid>
          <Field>
            <Label>Note aggiuntive 📝</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Scrivi qui eventuali richieste particolari..."
            />
          </Field>
          <ButtonGrid>
            <Link href="/" passHref>
              <Button>Indietro</Button>
            </Link>
            <Button
              type="submit"
              aria-disabled={isLaunching}
              onClick={() => setIsLaunching(true)}
            >
              <span style={{ flex: 1, textAlign: "center" }}>Conferma</span>
              <Rocket
                isLaunching={isLaunching}
                style={{ right: 10, top: "50%" }}
              />
            </Button>
          </ButtonGrid>
        </Form>
      )}
      <ConfettiComponent />
    </Container>
  );
}
