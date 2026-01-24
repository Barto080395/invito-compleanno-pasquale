import { Partecipante } from "@/app/form/page";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type RSVPBody = {
  partecipanti: Partecipante[];
  notes: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: RSVPBody = await req.json();
    const { partecipanti, notes } = body;

    // Controllo partecipanti
    if (!partecipanti || partecipanti.length === 0) {
      return NextResponse.json({ message: "Nessun partecipante fornito" }, { status: 400 });
    }

    // Controllo che tutti i partecipanti abbiano nome e cognome
    const invalidPartecipanti = partecipanti.filter((p) => !p.name || !p.surname);
    if (invalidPartecipanti.length > 0) {
      return NextResponse.json({ message: "Tutti i partecipanti devono avere nome e cognome" }, { status: 400 });
    }

    // Controllo email password
    if (!process.env.EMAIL_PASSWORD) {
      console.error("EMAIL_PASSWORD non impostata!");
      return NextResponse.json({ message: "Password email non configurata" }, { status: 500 });
    }

    // Inizializzazione nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.libero.it",
      port: 465,
      secure: true, // true per 465
      auth: {
        user: "bartolomeo.braccio@libero.it",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Creazione testo per tutti i partecipanti
    const partecipantiText = partecipanti
      .map(
        (p: Partecipante, index: number) => `👤 Partecipante ${index + 1}:
Nome: ${p.name}
Cognome: ${p.surname}
Tipologia: ${p.tipo}
Menù scelto: ${p.menu}
Intolleranze / Allergie: ${p.intolerance}`
      )
      .join("\n\n");

    // Invio email
    await transporter.sendMail({
      from: "bartolomeo.braccio@libero.it",
      to: "bartolomeo.braccio@libero.it",
      subject: "RSVP Compleanno Pasquale!",
      text: `✅ Nuova conferma RSVP:

${partecipantiText}

📝 Note aggiuntive: ${notes || "Nessuna"}`,
    });

    console.log("Mail inviata:", partecipanti.map((p) => p.name).join(", "));
    return NextResponse.json({ message: "Mail inviata!" });
  } catch (error) {
    console.error("Errore invio mail:", error);
    return NextResponse.json({ message: "Errore invio mail", error }, { status: 500 });
  }
}
