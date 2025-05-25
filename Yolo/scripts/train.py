from ultralytics import YOLO

def main():
    data_yaml = '../Yolo/datasets/data.yaml'
    model = YOLO('models/yolo12n.pt')

    results = model.train(
        data=data_yaml,
        epochs=300,
        imgsz=960,
        batch=8,
        lr0=0.005 ,
        optimizer='SGD',
        patience=30,
        device=0,
        project='runs/train',
        name='Volleyballyolo12n960imgsz',
        exist_ok=True
    )

if __name__ == "__main__":
    main()