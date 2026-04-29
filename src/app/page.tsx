import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Accueil",
};

export default function Home() {
  return (
    <main className="container views">
      <h2>Bienvenue sur TechTalk</h2>
      <p>Plateforme de discussions techniques et de partage de connaissances.</p>
    </main>
  );
}
