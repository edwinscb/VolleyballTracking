from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from app.services.yolo_service import YOLOService
from moviepy.editor import VideoFileClip
import os
import uuid
from pathlib import Path

router = APIRouter()
yolo_service = YOLOService(model_path="backend/app/models/Volleyballyolo12n960imgsz.pt")

UPLOAD_DIR = "app/static/uploads"
RESULT_DIR = "app/static/results"
MAX_DURATION = 120  # Duración máxima en segundos (2 minutos)
MAX_FILES = 10  # Número máximo de archivos a mantener

# Crear directorios si no existen
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESULT_DIR, exist_ok=True)

def clean_old_files(directory: str, max_files: int = MAX_FILES):
    """
    Elimina los archivos más antiguos en un directorio, manteniendo solo los más recientes.
    """
    files = sorted(
        [f for f in Path(directory).iterdir() if f.is_file()],
        key=lambda f: f.stat().st_mtime,
        reverse=True
    )
    for file in files[max_files:]:
        os.remove(file)

@router.post("/upload/")
async def upload_video(file: UploadFile = File(...)):
    """
    Endpoint para subir y procesar un video.
    """
    file_id = str(uuid.uuid4())
    input_filename = f"{file_id}_{file.filename}"
    input_path = os.path.join(UPLOAD_DIR, input_filename)
    output_filename = f"{file_id}_processed.mp4"
    output_path = os.path.join(RESULT_DIR, output_filename)

    # Guardar el archivo subido
    with open(input_path, "wb") as buffer:
        buffer.write(await file.read())

    # Verificar la duración del video
    try:
        with VideoFileClip(input_path) as clip:
            if clip.duration > MAX_DURATION:
                os.remove(input_path)
                raise HTTPException(status_code=400, detail="La duración del video excede los 2 minutos.")
    except Exception as e:
        os.remove(input_path)
        raise HTTPException(status_code=400, detail="Error al procesar el video.")

    # Procesar el video con YOLO
    yolo_service.process_video(input_path, output_path)

    # Limpiar archivos antiguos
    clean_old_files(UPLOAD_DIR)
    clean_old_files(RESULT_DIR)

    return {
        "video_id": file_id,
        "processed_video": output_filename
    }

@router.get("/download/{video_id}")
async def download_video(video_id: str):
    """
    Endpoint para descargar un video procesado.
    """
    for filename in os.listdir(RESULT_DIR):
        if filename.startswith(video_id):
            file_path = os.path.join(RESULT_DIR, filename)
            return FileResponse(path=file_path, media_type='video/mp4', filename=filename)
    raise HTTPException(status_code=404, detail="Video no encontrado.")
