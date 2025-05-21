import { useLanguage } from "../context/LanguageContext";
import "../styles/MetricsDescription.css";
import { FaRegObjectGroup, FaPercent, FaCogs, FaCheckCircle, FaBullseye, FaTachometerAlt, FaSync, FaRoute } from "react-icons/fa";

const LANGUAGES = {
  EN: "en",
  ES: "es",
};

const METRICS_INFO = {
  [LANGUAGES.EN]: [
    {
      key: "iou",
      label: "Average IoU",
      desc: "Intersection over Union (IoU) measures how much the predicted bounding box overlaps with the true box. Higher IoU means more accurate detection.",
      icon: <FaRegObjectGroup className="metrics-icon" style={{ color: "#a684ff" }} />
    },
    {
      key: "mota",
      label: "MOTA",
      desc: "Multiple Object Tracking Accuracy (MOTA) summarizes the tracking errors including missed detections, false positives, and ID switches.",
      icon: <FaPercent className="metrics-icon" style={{ color: "#f38ba8" }} />
    },
    {
      key: "motp",
      label: "MOTP",
      desc: "Multiple Object Tracking Precision (MOTP) measures how precisely the predicted positions match the true positions on average.",
      icon: <FaCogs className="metrics-icon" style={{ color: "#89b4fa" }} />
    },
    {
      key: "precision",
      label: "Precision",
      desc: "Precision is the percentage of detected objects that are actually correct. High precision means few false positives.",
      icon: <FaCheckCircle className="metrics-icon" style={{ color: "#94e2d5" }} />
    },
    {
      key: "recall",
      label: "Recall",
      desc: "Recall is the percentage of all real objects that were detected. High recall means few false negatives.",
      icon: <FaBullseye className="metrics-icon" style={{ color: "#fab387" }} />
    },
    {
      key: "fps",
      label: "FPS",
      desc: "Frames Per Second: how many video frames the model can process per second. Measures speed.",
      icon: <FaTachometerAlt className="metrics-icon" style={{ color: "#f9e2af" }} />
    },
    {
      key: "id_switches",
      label: "ID Switches",
      desc: "Counts how often the tracker assigns a new ID to the same object. Fewer switches mean better tracking consistency.",
      icon: <FaSync className="metrics-icon" style={{ color: "#cba6f7" }} />
    },
    {
      key: "trajectory",
      label: "Trajectory Visualization",
      desc: "Shows the path followed by the object throughout the video. Useful to visualize tracking quality.",
      icon: <FaRoute className="metrics-icon" style={{ color: "#b4befe" }} />
    },
  ],
  [LANGUAGES.ES]: [
    {
      key: "iou",
      label: "IoU Promedio",
      desc: "Intersection over Union (IoU) mide cuánto se superpone la caja predicha con la caja real. Un IoU más alto indica detección más precisa.",
      icon: <FaRegObjectGroup className="metrics-icon" style={{ color: "#a684ff" }} />
    },
    {
      key: "mota",
      label: "MOTA",
      desc: "Multiple Object Tracking Accuracy (MOTA) resume los errores de tracking, incluyendo detecciones perdidas, falsos positivos y cambios de ID.",
      icon: <FaPercent className="metrics-icon" style={{ color: "#f38ba8" }} />
    },
    {
      key: "motp",
      label: "MOTP",
      desc: "Multiple Object Tracking Precision (MOTP) mide qué tan preciso es el modelo ubicando los objetos en promedio.",
      icon: <FaCogs className="metrics-icon" style={{ color: "#89b4fa" }} />
    },
    {
      key: "precision",
      label: "Precisión",
      desc: "Es el porcentaje de objetos detectados que son correctos. Alta precisión significa pocos falsos positivos.",
      icon: <FaCheckCircle className="metrics-icon" style={{ color: "#94e2d5" }} />
    },
    {
      key: "recall",
      label: "Recall",
      desc: "Es el porcentaje de todos los objetos reales que fueron detectados. Alto recall significa pocos falsos negativos.",
      icon: <FaBullseye className="metrics-icon" style={{ color: "#fab387" }} />
    },
    {
      key: "fps",
      label: "FPS",
      desc: "Cuadros por segundo que el modelo puede procesar. Mide la velocidad del modelo.",
      icon: <FaTachometerAlt className="metrics-icon" style={{ color: "#f9e2af" }} />
    },
    {
      key: "id_switches",
      label: "ID Switches",
      desc: "Cuenta cuántas veces el tracker asigna un nuevo ID al mismo objeto. Menos cambios indican mejor seguimiento.",
      icon: <FaSync className="metrics-icon" style={{ color: "#cba6f7" }} />
    },
    {
      key: "trajectory",
      label: "Visualización de Trayectoria",
      desc: "Muestra el camino seguido por el objeto en el video. Útil para visualizar la calidad del tracking.",
      icon: <FaRoute className="metrics-icon" style={{ color: "#b4befe" }} />
    },
  ],
};

export const MetricsDescription = () => {
  const { currentLang } = useLanguage();
  const metrics = METRICS_INFO[currentLang];

  return (
    <section className="metrics-description-section">
      <h2 className="metrics-description-title">
        {currentLang === "en"
          ? "What Does Each Metric Mean?"
          : "¿Qué significa cada métrica?"}
      </h2>
      <ul className="metrics-description-list">
        {metrics.map((m) => (
          <li className="metrics-description-item" key={m.key}>
            {m.icon}
            <div>
              <strong className="metrics-description-label">{m.label}</strong>
              <span className="metrics-description-desc">{m.desc}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
