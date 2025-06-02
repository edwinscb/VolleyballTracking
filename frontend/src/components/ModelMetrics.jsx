import { useLanguage } from "../context/LanguageContext";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import "../styles/ModelMetrics.css";
import csvPath from "../assets/csv/resultsVolleyballyolo12n960imgsz.csv";
import { FaCheckCircle, FaBullseye, FaSignal, FaChartLine } from "react-icons/fa";

const LANGUAGES = {
  EN: "en",
  ES: "es",
};

const METRICS_INFO = {
  [LANGUAGES.EN]: [
    { key: "precision", label: "Precision", icon: <FaCheckCircle className="metrics-icon" style={{ color: "#94e2d5" }} /> },
    { key: "recall", label: "Recall", icon: <FaBullseye className="metrics-icon" style={{ color: "#fab387" }} /> },
    { key: "map_50", label: "mAP@50", icon: <FaSignal className="metrics-icon" style={{ color: "#a6e3a1" }} /> },
    { key: "map_50_95", label: "mAP@50-95", icon: <FaChartLine className="metrics-icon" style={{ color: "#cba6f7" }} /> },
  ],
  [LANGUAGES.ES]: [
    { key: "precision", label: "Precisión", icon: <FaCheckCircle className="metrics-icon" style={{ color: "#94e2d5" }} /> },
    { key: "recall", label: "Recall", icon: <FaBullseye className="metrics-icon" style={{ color: "#fab387" }} /> },
    { key: "map_50", label: "mAP@50", icon: <FaSignal className="metrics-icon" style={{ color: "#a6e3a1" }} /> },
    { key: "map_50_95", label: "mAP@50-95", icon: <FaChartLine className="metrics-icon" style={{ color: "#cba6f7" }} /> },
  ],
};

export const ModelMetrics = () => {
  const { currentLang } = useLanguage();
  const metrics = METRICS_INFO[currentLang];

  const [rows, setRows] = useState([]);
  const [selectedEpochIndex, setSelectedEpochIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(csvPath)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch CSV file");
        return res.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const cleanedRows = result.data.map((row) => {
              const cleaned = {};
              Object.entries(row).forEach(([key, value]) => {
                cleaned[key.trim()] = value;
              });
              return cleaned;
            });
            console.log("Claves de la fila:", Object.keys(cleanedRows[0]));

            setRows(cleanedRows);
            setSelectedEpochIndex(cleanedRows.length - 1); // Última por defecto
            setLoading(false);
          },
        });
        
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
      
  }, []);
  
  if (loading) {
    return <p style={{ textAlign: "center" }}>{currentLang === "en" ? "Loading..." : "Cargando..."}</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{currentLang === "en" ? "Error:" : "Error:"} {error}</p>;
  }

  const currentRow = rows[selectedEpochIndex];
  const parsedValues = {
    precision: parseFloat(currentRow["metrics/precision(B)"]?.replace(",", ".")),
    recall: parseFloat(currentRow["metrics/recall(B)"]?.replace(",", ".")),
    map_50: parseFloat(currentRow["metrics/mAP50(B)"]?.replace(",", ".")),
    map_50_95: parseFloat(currentRow["metrics/mAP50-95(B)"]?.replace(",", ".")),
  };

  return (
    <section className="model-metrics-section">
      <h2 className="model-metrics-title">
        {currentLang === "en" ? "Model Performance Metrics" : "Métricas del Modelo"}
      </h2>

      <div className="model-metrics-select-wrapper">
        <label htmlFor="epoch-select" className="model-metrics-label">
          {currentLang === "en" ? "Epoch:" : "Época:"}
        </label>
        <select
          id="epoch-select"
          className="model-metrics-select"
          value={selectedEpochIndex}
          onChange={(e) => setSelectedEpochIndex(Number(e.target.value))}
        >
          {rows.map((row, index) => (
            <option key={index} value={index}>
              {currentLang === "en" ? "Epoch" : "Época"} {row["epoch"]}
            </option>
          ))}
        </select>
      </div>

      <ul className="model-metrics-list">
        {metrics.map((m) => (
          <li className="model-metrics-item" key={m.key}>
            {m.icon}
            <div className="model-metrics-info">
              <span className="model-metrics-label">{m.label}</span>
              <span className="model-metrics-value">
                {typeof parsedValues[m.key] === "number"
                  ? parsedValues[m.key].toFixed(2)
                  : parsedValues[m.key] ?? "-"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
