from ultralytics import YOLO

model = YOLO('Yolo/runs/train/Volleyballyolo12s/weights/best.pt')
results = model.predict(source='Yolo/assets/video/shortVolleyabllVideo2.mp4', show=True)
