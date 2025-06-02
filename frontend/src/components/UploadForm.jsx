import { useState, useRef } from "react";
import { useEffect } from "react";
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
    error: "An error occurred. Try again.",
    download: "Download Video",
    watch: "Watch processed video",
    statusOnline: "database is online",
    statusOffline: "database is offline",
    wakeRequest: "Request Wake-up",
    wakingUp: "Waking up database...",
    wakeSent: "Wake-up requested!"

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
    watch: "Ver video procesado",
    statusOnline: "la base de datos está en línea",
    statusOffline: "la base de datos fuera de línea",
    wakeRequest: "Solicitar encendido",
    wakingUp: "Encendiendo backend...",
    wakeSent: "¡Solicitud de encendido enviada!"

  }
};

export const UploadForm = ({ onUploadSuccess,apiUrl  }) => {
  const [validationError, setValidationError] = useState("");
  const { currentLang } = useLanguage();
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState("");
  const [videoId, setVideoId] = useState(null);
  const fileInput = useRef(null);
  const [backendOnline, setBackendOnline] = useState(null);
  const [waking, setWaking] = useState(false);
  const [wakeRequested, setWakeRequested] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setResult("");
    setVideoId(null);
    setValidationError("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const videoElement = document.createElement("video");
    videoElement.preload = "metadata";

    videoElement.onloadedmetadata = () => {
      window.URL.revokeObjectURL(videoElement.src);
      const duration = videoElement.duration;
      if (duration > 60) {
        setValidationError("El video no puede durar más de 60 segundos.");
        setFile(null);
      } else {
        setFile(selectedFile);
      }
    };

    videoElement.onerror = () => {
      setValidationError("Archivo no válido.");
      setFile(null);
    };

    videoElement.src = URL.createObjectURL(selectedFile);
  };


  const requestWakeUp = async () => {
    setWaking(true);
    try {
      const res = await fetch(`${apiUrl}/wake`, { method: "POST" });
      if (res.ok) {
        setWakeRequested(true);
      }
    } catch (err) {
      console.error("Wake-up request failed");
    } finally {
      setWaking(false);
    }
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

      const response = await fetch(`${apiUrl}/upload`, {
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
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`${apiUrl}/status`);
        if (res.ok) {
          setBackendOnline(true);
        } else {
          setBackendOnline(false);
        }
      } catch {
        setBackendOnline(false);
      }
    };

    checkStatus();
  }, [apiUrl]);
  return (
    <section className="upload-section" id="demo">
      <div className="backend-status">
        {backendOnline === null ? (
          <span>...</span>
        ) : backendOnline ? (
          <span className="status-online">{TRANSLATIONS[currentLang].statusOnline}</span>
        ) : (
          <div className="status-offline">
            <span>{TRANSLATIONS[currentLang].statusOffline}</span>
            <button
              className="wake-button"
              onClick={requestWakeUp}
              disabled={waking}
            >
              {waking
                ? TRANSLATIONS[currentLang].wakingUp
                : TRANSLATIONS[currentLang].wakeRequest}
            </button>
            {wakeRequested && (
              <span className="wake-sent">{TRANSLATIONS[currentLang].wakeSent}</span>
            )}
          </div>
        )}
      </div>
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
        {validationError && (
          <div className="upload-error">{validationError}</div>
        )}

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
            src={`${apiUrl}/show/${videoId}`}
          >
            Tu navegador no soporta la reproducción de video.
          </video>

          <div className="download-button">
            <a
              href={`${apiUrl}/download/${videoId}`}
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
