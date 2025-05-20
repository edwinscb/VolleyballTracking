import logo from "../assets/img/LogoVolleyballRobot.svg";
import "../styles/Footer.css";
export const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <img src={logo} alt="Logo" className="footer-logo" />
      <span className="footer-text">
        &copy; {new Date().getFullYear()} Volleyball Tracking &nbsp;|&nbsp; Proyecto Open Source
      </span>
      <a
        href="https://github.com/tu-usuario/tu-repo"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
        aria-label="GitHub"
      >
        GitHub
      </a>
    </div>
  </footer>
);
