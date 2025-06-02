# VolleyIA

**Repositorio:** volleyTracking

VolleyIA es una aplicación web para detectar el balón de volleyball en videos y mostrar métricas de las épocas del modelo entrenado.

## Tecnologías utilizadas

- Frontend: React
- Backend: FastAPI
- Modelos de visión por computadora: YOLO (Ultralytics, PyTorch)
- Procesamiento de imágenes y videos: OpenCV (cv2)

## Flujo principal de uso

1. El usuario sube un video desde la página web (con el componente `UploadForm`).
2. El frontend verifica que el video tenga una duración menor a 1 minuto.
3. Se envía el video al backend (FastAPI), que también valida la duración.
4. El backend procesa el video usando el modelo YOLO entrenado para detectar el balón.
5. Devuelve un `video_id` que el frontend usa para mostrar el video procesado y ofrece una opción para descargarlo.

## Componentes principales del frontend

- `Navbar` — barra de navegación.
- `Banner` — sección principal de bienvenida.
- `Demo` — videos de ejemplo post-procesados.
- `Footer` — pie de página.
- `MetricsDescription` — explica el significado de cada métrica mostrada.
- `ModelMetrics` — muestra las métricas del modelo usadas en backend.
- `UploadForm` — formulario para subir videos.

El diseño es responsivo, adaptándose a distintos dispositivos.

## Comandos principales

- `cloudflared tunnel --url http://localhost:8000` — para exponer el backend local.
- `uvicorn app.main:app --reload` — para iniciar el backend FastAPI.
- `npm start` — para iniciar el frontend React.
- `python -m venv venv` — para crear entorno virtual de Python.

---

_Proyecto en desarrollo._
