from ultralytics import YOLO
import numpy as np

def print_metrics(metrics, model_name):
    print(f"\n===== Resultados para {model_name} =====")
    print(f"mAP50:      {metrics.box.map50:.4f}")
    print(f"mAP50-95:   {metrics.box.map:.4f}")
    print(f"Precision:  {metrics.box.mp:.4f}")
    print(f"Recall:     {metrics.box.mr:.4f}")
    # F1-score promedio (puede ser un array, tomamos el promedio)
    try:
        f1 = metrics.box.f1
        f1_mean = np.mean(f1)
        print(f"F1-score:   {f1_mean:.4f}")
    except Exception:
        print(f"F1-score:   (no disponible)")

def main():
    model1 = YOLO("Yolo/runs/train/Volleyballyolo12n960imgsz/weights/best.pt")
    model2 = YOLO("Yolo/runs/train/Volleyballyolo12s/weights/best.pt")
    data_yaml = 'Yolo/datasets/data.yaml'
    metrics1 = model1.val(data=data_yaml)
    metrics2 = model2.val(data=data_yaml)
    print_metrics(metrics1, "Modelo 12n")
    print_metrics(metrics2, "Modelo 12s")

if __name__ == "__main__":
    main()
