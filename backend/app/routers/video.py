from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse

from app.services.yolo_service import YOLOService
import cv2
import os
import uuid

from pathlib import Path
from typing import List

router = APIRouter()
yolo_service = YOLOService(model_path="app/models/Volleyballyolo12n960imgsz.pt")
BASE_DIR = Path(__file__).resolve().parent.parent  # apunta a la raíz de tu app
UPLOAD_DIR = BASE_DIR / "static" / "uploads"
RESULT_DIR = BASE_DIR / "static" / "results"

MAX_DURATION = 120
MAX_FILES = 5

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
RESULT_DIR.mkdir(parents=True, exist_ok=True)

def clean_old_files(directory: Path, max_files: int = MAX_FILES):
    files = sorted([f for f in directory.iterdir() if f.is_file()], key=lambda f: f.stat().st_mtime, reverse=True)
    for f in files[max_files:]:
        f.unlink()

def get_video_duration(video_path):
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        return -1
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT)
    cap.release()
    return frame_count / fps if fps > 0 else -1

@router.post("/upload/")
async def upload_video(file: UploadFile = File(...)):
    file_id = uuid.uuid4().hex
    input_path = UPLOAD_DIR / f"{file_id}_{file.filename}"
    output_path = RESULT_DIR / f"{file_id}_processed.mp4"
    
    with input_path.open("wb") as buffer:
        buffer.write(await file.read())
    
    try:
        duration = get_video_duration(str(input_path))
        if duration == -1:
            input_path.unlink()
            raise HTTPException(status_code=400, detail="No se pudo procesar el video.")
        if duration > MAX_DURATION:
            input_path.unlink()
            raise HTTPException(status_code=400, detail="La duración del video excede los 2 minutos.")
    except Exception:
        input_path.unlink()
        raise HTTPException(status_code=400, detail="Error al procesar el video.")
    
    yolo_service.process_video(str(input_path), str(output_path))

    if not output_path.exists():
        raise HTTPException(status_code=500, detail="El video no se procesó correctamente.")

    clean_old_files(UPLOAD_DIR)
    clean_old_files(RESULT_DIR)

    return {"video_id": file_id, "processed_video": output_path.name}

@router.get("/download/{video_id}")
async def download_video(video_id: str):
    for filename in os.listdir(RESULT_DIR):
        if filename.startswith(video_id):
            file_path = RESULT_DIR / filename
            return FileResponse(path=file_path, media_type='video/mp4', filename=filename)
    raise HTTPException(status_code=404, detail="Video no encontrado.")

@router.get("/show/{video_id}")
async def show_video(video_id: str):
    filename = f"{video_id}_processed.mp4"
    file_path = RESULT_DIR / filename
    if file_path.exists():
        return FileResponse(
            path=file_path,
            media_type="video/mp4",
            filename=filename,
            headers={"Content-Disposition": f"inline; filename={filename}"}
        )
    raise HTTPException(status_code=404, detail="Video no encontrado.")
   
@router.get("/list/")
async def list_processed_videos() -> List[dict]:
    video_files = sorted(
        [f for f in RESULT_DIR.iterdir() if f.is_file()],
        key=lambda f: f.stat().st_mtime,
        reverse=True
    )
    video_list = []
    for f in video_files:
        name_parts = f.name.split("_")
        if len(name_parts) >= 2:
            video_id = name_parts[0]
            video_list.append({
                "video_id": video_id,
                "filename": f.name,
                "last_modified": f.stat().st_mtime
            })
    return video_list
