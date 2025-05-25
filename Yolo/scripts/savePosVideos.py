from ultralytics import YOLO

model = YOLO('Yolo/runs/train/Volleyballyolo12n960imgsz/weights/best.pt')

results = model.predict(
    source='Yolo/assets/video/shortVolleyabllVideo2.mp4',
    show=False,
    save=True,
    save_txt=False,
    project='Yolo/assets/video',
    name='volley_video_detected',
    exist_ok=True
)

print("¡Video procesado y guardado exitosamente!")
