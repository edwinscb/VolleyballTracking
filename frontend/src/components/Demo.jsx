import { useLanguage } from "../context/LanguageContext";
import "../styles/Demo.css";

const LANGUAGES = {
  EN: "en",
  ES: "es",
};

const DEMO_TITLES = {
  [LANGUAGES.EN]: "Model Demo Videos",
  [LANGUAGES.ES]: "Videos de Demostración del Modelo",
};

const videoFiles = [
  require("../assets/video/shortVideo1.mp4"),
  require("../assets/video/shortVideo2.mp4"),
  require("../assets/video/shortVideo3.mp4"),
  require("../assets/video/shortVideo4.mp4"),
  require("../assets/video/shortVideo5.mp4"),
];

export const Demo = () => {
  const { currentLang } = useLanguage();

  return (
    <section className="demo-section">
      <h2 className="demo-title">{DEMO_TITLES[currentLang]}</h2>
      <div className="demo-grid">
        {videoFiles.map((videoSrc, index) => (
          <div className="demo-video-wrapper" key={index}>
            <video
              className="demo-video"
              src={videoSrc}
              controls
              muted
              preload="metadata"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
