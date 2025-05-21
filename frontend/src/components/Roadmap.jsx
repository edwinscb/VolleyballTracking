import { useLanguage } from "../context/LanguageContext";
import step1icon from "../assets/img/imgVolleyballTracker.svg";
import step2icon from "../assets/img/imgVolleyballTracker.svg";
import step3icon from "../assets/img/imgVolleyballTracker.svg";
import step4icon from "../assets/img/imgVolleyballTracker.svg";

import "../styles/Roadmap.css";

const LANGUAGES = {
  EN: 'en',
  ES: 'es'
};

const ROADMAP_STEPS = {
  [LANGUAGES.EN]: [
    {
      icon: step1icon,
      color: "#FF5B59",
      number: "1",
      title: "Upload Video",
      desc: "Select and upload your volleyball video to get started."
    },
    {
      icon: step2icon,
      color: "#31C4F3",
      number: "2",
      title: "AI Analysis",
      desc: "Our AI model processes and analyzes all players and ball movements."
    },
    {
      icon: step3icon,
      color: "#FFB547",
      number: "3",
      title: "Visualize",
      desc: "See bounding boxes, player tracking and highlights on your video."
    },
    {
      icon: step4icon,
      color: "#43D97F",
      number: "4",
      title: "Get Metrics",
      desc: "Access match statistics and download your results."
    }
  ],
  [LANGUAGES.ES]: [
    {
      icon: step1icon,
      color: "#FF5B59",
      number: "1",
      title: "Sube tu video",
      desc: "Selecciona y sube tu video de voleibol para comenzar."
    },
    {
      icon: step2icon,
      color: "#31C4F3",
      number: "2",
      title: "Análisis con IA",
      desc: "Nuestro modelo procesa y analiza jugadores y balón."
    },
    {
      icon: step3icon,
      color: "#FFB547",
      number: "3",
      title: "Visualiza",
      desc: "Observa recuadros, tracking y jugadas en tu video."
    },
    {
      icon: step4icon,
      color: "#43D97F",
      number: "4",
      title: "Obtén métricas",
      desc: "Consulta estadísticas y descarga tus resultados."
    }
  ]
};

export const Roadmap = () => {
  const { currentLang } = useLanguage();
  const steps = ROADMAP_STEPS[currentLang];

  return (
    <section className="modern-roadmap" id="how">
      <h2 className="modern-roadmap-title">
        {currentLang === "en" ? "How it Works" : "¿Cómo funciona?"}
      </h2>
      <div className="modern-roadmap-list">
        {steps.map((step, idx) => (
          <div className="modern-roadmap-step" key={idx} data-aos="fade-up">
            <div className="modern-roadmap-line" />
            <div className="modern-roadmap-number" style={{ color: step.color }}>
              {step.number}
            </div>
            <div
              className="modern-roadmap-icon"
              style={{ background: step.color + "22", borderColor: step.color }}
            >
              <img src={step.icon} alt={step.title} />
            </div>
            <div className="modern-roadmap-content">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
            {/* Flecha hacia el siguiente paso */}
            {idx !== steps.length - 1 && (
              <svg className="modern-roadmap-arrow" width="28" height="46" viewBox="0 0 28 46" fill="none">
                <path
                  d="M14 0V42"
                  stroke={step.color}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M5 34L14 44L23 34"
                  stroke={step.color}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
