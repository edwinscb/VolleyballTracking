import { useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/UploadForm.css";
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
    error: "An error occurred. Try again."
  },
  [LANGUAGES.ES]: {
    title: "Procesa tu video de Voleibol",
    select: "Seleccionar video",
    noFile: "Ningún archivo seleccionado",
    upload: "Procesar video",
    processing: "Procesando video...",
    success: "¡Procesamiento completo!",
    error: "Ocurrió un error. Intenta de nuevo."
  }
};

export const UploadForm = ({ onUploadSuccess }) => {
  const { currentLang } = useLanguage();
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState("");
  const fileInput = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setProcessing(true);
    setResult("");
    try {
      // Ejemplo de envío al backend
      const formData = new FormData();
      formData.append("file", file);

      // Cambia la URL por la de tu backend Python
      const response = await fetch("https://tu-backend-api.com/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error();
      const data = await response.json();

      setProcessing(false);
      setResult("success");
      if (onUploadSuccess) onUploadSuccess(data);
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
      {result === "success" && (
        <div className="upload-success">{TRANSLATIONS[currentLang].success}</div>
      )}
      {result === "error" && (
        <div className="upload-error">{TRANSLATIONS[currentLang].error}</div>
      )}
    </section>
  );
};
