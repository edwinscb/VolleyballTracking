from ultralytics import YOLO
import cv2

class YOLOService:
    def __init__(self, model_path: str):
        self.model = YOLO(model_path)

    def process_video(self, video_path: str, output_path: str):
        cap = cv2.VideoCapture(video_path)
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = cap.get(cv2.CAP_PROP_FPS)
        
        if fps <= 0:
            fps = 30
        if width == 0 or height == 0:
            raise ValueError("Error al obtener dimensiones del video")

        # Intentar 'avc1' primero
        fourcc = cv2.VideoWriter_fourcc(*'avc1')
        out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
        if not out.isOpened():
            print("No se pudo abrir VideoWriter con 'avc1', intentando 'mp4v'")
            fourcc = cv2.VideoWriter_fourcc(*'mp4v')
            out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
            if not out.isOpened():
                cap.release()
                raise RuntimeError("No se pudo abrir VideoWriter con 'avc1' ni 'mp4v'")

        while True:
            ret, frame = cap.read()
            if not ret:
                break
            result = self.model(frame)
            processed_frame = result[0].plot()
            if processed_frame is None:
                processed_frame = frame
            out.write(processed_frame)

        cap.release()
        out.release()
