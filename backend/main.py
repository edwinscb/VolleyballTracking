from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse

app = FastAPI()

@app.post("/process-video")
async def process_video(video: UploadFile = File(...)):

    with open("input.mp4", "wb") as buffer:
        buffer.write(await video.read())

    return FileResponse("input.mp4", media_type="video/mp4", filename="output.mp4")
