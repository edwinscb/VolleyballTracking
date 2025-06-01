import { useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/UploadForm.css";

const API_URL = "https://insects-months-felt-section.trycloudflare.com";

const LANGUAGES = {
  EN: 'en',
  ES: 'es'
};

const TRANSLATIONS = {
  [LANGUAGES.EN]: {
    title: "Process your Volleyball Video",
    select: "Select Video",
    noFile: "No file selected",
    upload: "Process Video",
    processing: "Processing video...",
    success: "Processing complete!",
    error: "An error occurred. Try again.",
    download: "Download Video",
    watch: "Watch processed video"
  },
  [LANGUAGES.ES]: {
    title: "Procesa tu video de Voleibol",
    select: "Seleccionar video",
    noFile: "Ningún archivo seleccionado",
    upload: "Procesar video",
    processing: "Procesando video...",
    success: "¡Procesamiento completo!",
    error: "Ocurrió un error. Intenta de nuevo.",
    download: "Descargar Video",
    watch: "Ver video procesado"
  }
};

export const UploadForm = ({ onUploadSuccess }) => {
  const { currentLang } = useLanguage();
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState("");
  const [videoId, setVideoId] = useState(null);
  const fileInput = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult("");
    setVideoId(null); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setProcessing(true);
    setResult("");
    setVideoId(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/video/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error();
      const data = await response.json();

      setProcessing(false);
      setResult("success");
      setVideoId(data.video_id);
      if (onUploadSuccess) onUploadSuccess({ ...data, videoId: data.video_id });
    } catch (err) {
      setProcessing(false);
      setResult("error");
    }
  };

  return (
    <section className="upload-section" id="demo">
      <h2>{TRANSLATIONS[currentLang].title}</h2>

      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          ref={fileInput}
          onChange={handleFileChange}
        />

        <button
          type="button"
          className="upload-select-btn"
          onClick={() => fileInput.current && fileInput.current.click()}
        >
          {TRANSLATIONS[currentLang].select}
        </button>

        <span className="upload-file-label">
          {file ? file.name : TRANSLATIONS[currentLang].noFile}
        </span>

        <button
          type="submit"
          className="upload-submit-btn"
          disabled={processing || !file}
        >
          {processing
            ? TRANSLATIONS[currentLang].processing
            : TRANSLATIONS[currentLang].upload}
        </button>
      </form>

      {/* SPINNER DE PROCESAMIENTO */}
      {processing && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      {/* MENSAJE DE RESULTADO */}
      {result === "success" && (
        <div className="upload-success">{TRANSLATIONS[currentLang].success}</div>
      )}
      {result === "error" && (
        <div className="upload-error">{TRANSLATIONS[currentLang].error}</div>
      )}

      {/* VIDEO Y BOTÓN DE DESCARGA */}
      {videoId && (
        <div className="upload-video-result">
          <h3>{TRANSLATIONS[currentLang].watch}</h3>

          <video
            key={videoId}
            width="100%"
            height="auto"
            controls
            src={`${API_URL}/video/show/${videoId}`}
          >
            Tu navegador no soporta la reproducción de video.
          </video>

          <div className="download-button">
            <a
              href={`${API_URL}/video/download/${videoId}`}
              download={`volleyball_processed_${videoId}.mp4`}
            >
              {TRANSLATIONS[currentLang].download}
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
