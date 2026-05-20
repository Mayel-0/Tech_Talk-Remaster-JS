import type { Metadata } from "next";
import Carousel from "@/components/Carousel";

export const metadata: Metadata = {
  title: "À propos",
};

const images = [
  { src: "/img/about_bg_1.jpg", title: "Page 1", subtitle: "TECH" },
  { src: "/img/image.png",      title: "Page 2", subtitle: "TECH" },
  { src: "/img/image2.png",     title: "Page 3", subtitle: "TECH" },
  { src: "/img/image3.png",     title: "Page 4", subtitle: "TECH" },
  { src: "/img/image4.png",     title: "Page 5", subtitle: "TECH" },
  { src: "/img/image5.png",     title: "Page 6", subtitle: "TECH" },
  { src: "/img/imagegroupe.jpg",     title: "Page 7", subtitle: "TECH" },
];

export default function AboutPage() {
  return (
    <main className="container views">
      <h2>À propos de TechTalk</h2>
      <div className="section-about">
        <div className="box">
          <strong>TechTalk, c'est quoi ?</strong>
          <hr/>
          <p>TechTalk est un podcast vidéo hebdomadaire qui décrypte les grandes évolutions technologiques, que ce soit autour de l'intelligence artificielle, la cybersécurité, la transformation digitale, les droits d'auteurs... avec des mots simples et des vrais experts. On s'adresse aux étudiants des écoles du numérique et aux jeunes professionnels qui veulent comprendre le monde tech sans se perdre dans le jargon.</p>
          <p>Chaque épisode, c'est une conversation franche, des questions concrètes, et des réponses qui servent vraiment.</p>
        </div>

        <div className="box">
          <img src="/img/imagegroupe.jpg" alt="Image Podcast" />
        </div>

        <div className="box">
          <strong>L'équipe derrière le micro</strong>
          <hr/>
          <p>TechTalk est un projet étudiant né à Bordeaux Ynov Campus, porté par une équipe de 11 personnes réparties en trois pôles.</p>
          <strong>Animation & Marketing</strong>
          <hr/>
          <p>Maëlys (cheffe de projet & co-animatrice), Lylou (co-animatrice), Lana et Éléa s'occupent de la stratégie de communication, de l'identité visuelle et de la présence sur les réseaux.</p>
          <strong>Développement web</strong>
          <hr/>
          <p>Mathis, Maël et Antonin ont conçu et développé ce site de A à Z.</p>
          <strong>Production audiovisuelle</strong>
          <hr/>
          <p>Jules, Kilian, Léo et Louan gèrent le tournage, la prise de son et le montage de chaque épisode.</p>
        </div>

        <div className="box">
          <strong>Pourquoi ce projet ?</strong>
          <hr/>
          <p>Parce qu'on est convaincus que la tech, ça ne devrait pas être réservé aux initiés. TechTalk est né de l'envie de créer un espace où des experts et des expertes acceptent de jouer le jeu de la pédagogie, et où les auditeurs repartent avec quelque chose de concret.</p>
        </div>

        <Carousel images={images} autoPlay={true} autoPlayInterval={4000} loop={true} />
      </div>
    </main>
  );
}
