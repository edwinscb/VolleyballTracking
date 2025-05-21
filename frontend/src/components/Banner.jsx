import { useLanguage } from "../context/LanguageContext";
import bannerImg from "../assets/img/imgVolleyballTracker.svg";
import "../styles/Banner.css";
const LANGUAGES = {
  EN: 'en',
  ES: 'es'
};

const TRANSLATIONS = {
  [LANGUAGES.EN]: {
    title: "Volleyball Video Tracking",
    description:
      "Upload your volleyball match videos and get automated player and ball tracking powered by AI. Discover how our tool analyzes plays and provides metrics to improve your game.",
    button: "See Demo"
  },
  [LANGUAGES.ES]: {
    title: "Seguimiento de Video de Voleibol",
    description:
      "Sube videos de partidos de voleibol y obtén seguimiento automático de jugadores y balón con inteligencia artificial. Descubre cómo nuestra herramienta analiza jugadas y entrega métricas para mejorar tu juego.",
    button: "Ver Demostración"
  }
};

export const Banner = () => {
  const { currentLang } = useLanguage();

  return (
    <section className="banner" id="home">
      <div className="banner-content">
        <div className="banner-text">
          <h1>{TRANSLATIONS[currentLang].title}</h1>
          <p>{TRANSLATIONS[currentLang].description}</p>
          <a href="#demo" className="banner-button">
            {TRANSLATIONS[currentLang].button}
          </a>
        </div>
        <div className="banner-img-container">
          <img src={bannerImg} alt="Banner Illustration" className="banner-img" />
        </div>
      </div>
    </section>
  );
};