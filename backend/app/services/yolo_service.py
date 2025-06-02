from ultralytics import YOLO
import cv2
from threading import Thread
from queue import Queue

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

        # Intentar 'avc1' primero, si falla intenta 'mp4v'
        fourcc = cv2.VideoWriter_fourcc(*'avc1')
        out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
        if not out.isOpened():
            print("No se pudo abrir VideoWriter con 'avc1', intentando 'mp4v'")
            fourcc = cv2.VideoWriter_fourcc(*'mp4v')
            out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
            if not out.isOpened():
                cap.release()
                raise RuntimeError("No se pudo abrir VideoWriter con 'avc1' ni 'mp4v'")

        frame_queue = Queue(maxsize=20)   # Cola de frames para procesar
        result_queue = Queue(maxsize=20)  # Cola de resultados procesados

        def reader():
            while True:
                ret, frame = cap.read()
                if not ret:
                    frame_queue.put(None)
                    break
                frame_queue.put(frame)

        def processor():
            while True:
                frame = frame_queue.get()
                if frame is None:
                    result_queue.put(None)
                    break
                results = self.model(frame, device='cuda')
                processed = results[0].plot()
                result_queue.put(processed)

        def writer():
            while True:
                frame = result_queue.get()
                if frame is None:
                    break
                out.write(frame)

        threads = [
            Thread(target=reader),
            Thread(target=processor),
            Thread(target=writer)
        ]

        for t in threads:
            t.start()
        for t in threads:
            t.join()

        cap.release()
        out.release()
