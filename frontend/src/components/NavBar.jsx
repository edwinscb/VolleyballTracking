import { useState, useEffect, useCallback } from "react";
import "../styles/NavBar.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { HashLink } from "react-router-hash-link";
import { useLanguage } from "../context/LanguageContext";
import classNames from "classnames";

import logo from "../assets/img/LogoVolleyballRobot.svg";
import githubLogo from "../assets/img/gitHub-icon.svg"; 
import langIconES from "../assets/img/lang-icon-es.svg";
import langIconEN from "../assets/img/lang-icon-en.svg";

const LANGUAGES = {
  EN: 'en',
  ES: 'es'
};

const TRANSLATIONS = {
  [LANGUAGES.EN]: {
    home: "Home",
    demo: "Demo",
    how: "How it works",
    metrics: "Metrics",
    repo: "Repository",
    language: "Language"
  },
  [LANGUAGES.ES]: {
    home: "Inicio",
    demo: "Demostración",
    how: "Funcionamiento",
    metrics: "Métricas",
    repo: "Repositorio",
    language: "Idioma"
  }
};

const NAV_ITEMS = ["home", "demo", "how", "metrics"];

const LanguageSelector = ({ currentLang, toggleLanguage }) => (
  <div
    className="language-icon"
    onClick={toggleLanguage}
    aria-label={TRANSLATIONS[currentLang].language}
    role="button"
    tabIndex="0"
    onKeyDown={(e) => e.key === 'Enter' && toggleLanguage()}
  >
    <span className="language-text">{TRANSLATIONS[currentLang].language}</span>
    <img
      src={currentLang === LANGUAGES.ES ? langIconES : langIconEN}
      alt={currentLang === LANGUAGES.ES ? "Español" : "English"}
      className="language-flag"
      loading="lazy"
    />
  </div>
);

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { currentLang, toggleLanguage } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavLinkClick = useCallback((item) => {
    setActiveLink(item);
    setExpanded(false);
  }, []);

  const handleToggle = useCallback(() => setExpanded(prev => !prev), []);

  return (
    <Navbar
      expand="lg"
      className={classNames({ scrolled })}
      expanded={expanded}
      onToggle={handleToggle}
    >
      <Container className="nav-container">
        <Navbar.Brand href="/" aria-label="Home">
          <img src={logo} alt="Logo" className="logo-img" loading="lazy" style={{ height: 42 }} />
        </Navbar.Brand>

        <div className="d-flex align-items-center">
          <LanguageSelector
            currentLang={currentLang}
            toggleLanguage={toggleLanguage}
          />

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="navbar-toggler"
            aria-label={expanded ? "Close menu" : "Open menu"}
          />
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {NAV_ITEMS.map((item) => (
              <Nav.Link
                key={item}
                as={HashLink}
                to={`#${item}`}
                className={classNames("navbar-link", {
                  active: activeLink === item
                })}
                onClick={() => handleNavLinkClick(item)}
                aria-current={activeLink === item ? "page" : undefined}
              >
                {TRANSLATIONS[currentLang][item]}
              </Nav.Link>
            ))}

            <Nav.Link
              href="https://github.com/edwinscb/VolleyballTracking"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-link navbar-github-link"
              aria-label="GitHub Repository"
            >
              <img src={githubLogo} alt="GitHub" style={{ width: 22, marginRight: 6, verticalAlign: "middle" }} />
              {TRANSLATIONS[currentLang].repo}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
