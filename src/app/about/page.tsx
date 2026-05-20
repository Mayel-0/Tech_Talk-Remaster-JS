import type { Metadata } from "next";
import Carousel from "@/components/Carousel";

export const metadata: Metadata = {
  title: "À propos",
};

type CarouselImage = {
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
};

const images: CarouselImage[] = [
  { src: "/img/about_bg_1.jpg", title: "Page 1", subtitle: "TECH" },
  { src: "/img/image.png",      title: "Page 2", subtitle: "TECH" },
  { src: "/img/image2.png",     title: "Page 3", subtitle: "TECH" },
  { src: "/img/image3.png",     title: "Page 4", subtitle: "TECH" },
  { src: "/img/image4.png",     title: "Page 5", subtitle: "TECH" },
  { src: "/img/image5.png",     title: "Page 6", subtitle: "TECH" },
];

export default function AboutPage() {
  return (
    <main className="container views">
      <h2>À propos de TechTalk</h2>
      <div className="section-about">
        <p className="box">
          Je m'appelle Maëlys Nunes De Sousa, étudiante en M2 Social Media, Influence et E-reputation.
          Passionnée par les enjeux du digital et de la communication, j'ai créé ce podcast pour décrypter
          les évolutions technologiques qui façonnent nos métiers de demain. Ce projet est né d'un constat
          simple : nous, étudiants et jeunes professionnels, avons besoin de mieux comprendre les
          transformations rapides du secteur tech pour nous y préparer efficacement. Intelligence
          artificielle, cybersécurité, transformation digitale... autant de sujets qui peuvent sembler
          complexes mais qui sont essentiels à maîtriser pour rester agile dans nos domaines. J'ai choisi
          le podcast car c'est le format idéal pour rendre ces thématiques accessibles, concrètes et
          inspirantes.
        </p>

        <div className="box">
          <img src="/img/about_bg_1.jpg" alt="Image Podcast" />
        </div>

        <p className="box">
          Mon ambition est de créer un véritable pont entre le monde académique et le monde professionnel.
          À travers des témoignages d'experts et de professionnels du terrain, je souhaite vous informer
          sur les tendances digitales actuelles, vulgariser des concepts techniques parfois intimidants, et
          connecter l'écosystème tech local avec notre communauté étudiante. Ce projet me permet également
          de développer mes compétences en production audiovisuelle et gestion de projet média.
        </p>

        <p className="box">
          Ce podcast s'adresse à vous, étudiants en écoles digitales et jeunes professionnels en début de
          carrière, qui voulez comprendre et anticiper les évolutions de vos futurs métiers. Mon souhait
          est qu'après chaque épisode, vous vous sentiez inspirés et convaincus que vous pouvez, vous
          aussi, comprendre et contribuer à la transformation digitale. J'espère vous transmettre des
          insights concrets et actionnables qui vous donneront envie d'approfondir ces sujets et
          d'appliquer ces conseils dans votre parcours professionnel.
        </p>

        <Carousel images={images} autoPlay={true} autoPlayInterval={4000} loop={true} />
      </div>
    </main>
  );
}
