from ultralytics import YOLO

def main():
    data_yaml = '../Yolo/datasets/data.yaml'
    model = YOLO('models/yolo12s.pt')

    results = model.train(
        data=data_yaml,
        epochs=200,
        imgsz=640,
        batch=16,
        lr0=0.01,
        optimizer='SGD',
        patience=30,
        device=0,
        project='runs/train',
        name='Volleyballyolo12s',
        exist_ok=True
    )

if __name__ == "__main__":
    main()