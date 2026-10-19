import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientName, clientPhone, totalAmount, services } = body;

    // 💡 Intégration avec une passerelle de paiement (ex: PayTech, PayDunya ou Wave API directe)
    // Vous y envoyez les clés secrètes et récupérez l'URL de redirection de paiement.
    
    // Exemple de structure pour une requête vers une API de paiement au Sénégal :
    /*
    const waveResponse = await fetch("https://api.wave.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WAVE_API_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: totalAmount,
        currency: "XOF",
        error_url: "https://votre-site.com/erreur",
        success_url: "https://votre-site.com/succes",
      }),
    });
    const paymentData = await waveResponse.json();
    */

    // Simulation d'une URL de redirection de paiement validée pour le test :
    const simulatedPaymentUrl = `https://pay.wave.com/c/senegal?amount=${totalAmount}&memo=SecretBeauty`;

    return NextResponse.json({ paymentUrl: simulatedPaymentUrl });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}