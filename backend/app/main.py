from fastapi import FastAPI
from app.routers import video 
app = FastAPI()
app.include_router(video.router, prefix="/video", tags=["video"])
@app.get("/")
async def read_root():
    return {"message": "Bienvenido a la API de Volleyball Tracking"}
