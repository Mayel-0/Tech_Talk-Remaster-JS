import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page non trouvée",
};

export default function NotFound() {
  return (
    <main className="container views">
      <div className="error-container" style={{ textAlign: "center", paddingTop: "60px" }}>
        <div style={{ fontSize: "72px", marginBottom: "20px" }}>🔍</div>
        <h1>page non trouvée</h1>
        <p style={{ fontSize: "18px", color: "#666", marginBottom: "40px" }}>
          Désolé, la page que tu cherches n'existe pas.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 32px",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Retour à l'accueil
        </Link>
      </div>
      <div className="backgroundSVG error">
        <img src="/svg/background.svg" alt="Background" />
        <img src="/svg/background.svg" alt="Background" />
      </div>
    </main>
  );
}
