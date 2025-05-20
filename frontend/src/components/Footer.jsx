import logo from "../assets/img/LogoVolleyballRobot.svg";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Footer.css";
const LANGUAGES = {
  EN: 'en',
  ES: 'es'
};

const TRANSLATIONS = {
  [LANGUAGES.EN]: {
    copyright: "Volleyball IA Tracking | Open Source Project",
    github: "GitHub"
  },
  [LANGUAGES.ES]: {
    copyright: "Volleyball IA seguimiento | Proyecto Open Source",
    github: "GitHub"
  }
};

export const Footer = () => {
  const { currentLang } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={logo} alt="Logo" className="footer-logo" />
        <span className="footer-text">
          &copy; {new Date().getFullYear()} {TRANSLATIONS[currentLang].copyright}
        </span>
        <a
          href="https://github.com/edwinscb/VolleyballTracking"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
          aria-label="GitHub"
        >
          {TRANSLATIONS[currentLang].github}
        </a>
      </div>
    </footer>
  );
};
