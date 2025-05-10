from confluent_kafka import Producer
import tempfile
from fastapi import FastAPI, UploadFile, File
app = FastAPI()
from fastapi import FastAPI
app = FastAPI()


producer = Producer({'bootstrap.servers': 'kafka:9092'})


@app.post("/api/async-image")
async def async_image_process(file: UploadFile = File(...)):
    temp = tempfile.NamedTemporaryFile(delete=False)
    temp.write(await file.read())
    temp.flush()

    payload = {
        'filename': file.filename,
        'path': temp.name
    }

    producer.produce('image-topic', value=json.dumps(payload))
    producer.flush()

    return {"message": "Image envoyée à Kafka pour traitement"}
