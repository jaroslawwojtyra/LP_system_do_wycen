import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/contact", (req, res) => {
    const { name, email, company, comment, marketingConsent } = req.body;
    
    // Format requested by user
    const emailBody = `Zgłoszenie z formularza demo AURA:
Imię i nazwisko: ${name}
Adres e-mail: ${email}
Nazwa firmy: ${company || "Brak"}
Komentarz: ${comment || "Brak"}
Zgoda marketingowa: ${marketingConsent ? "Tak" : "Nie"}`;

    console.log("--- WYSYŁANIE MAILA DO kontakt@aura-system.pl ---");
    console.log(emailBody);
    console.log("---------------------------------------------------------");

    // In a real production app, we would use nodemailer or a service like SendGrid here.
    // For this demo, we simulate success.
    res.json({ success: true, message: "Zgłoszenie zostało wysłane." });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
