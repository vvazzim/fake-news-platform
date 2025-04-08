from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import requests
import tempfile
import json
from confluent_kafka import Producer
import os

producer = Producer({'bootstrap.servers': 'kafka:9092'})
app = FastAPI()

IMAGE_API_URL = "http://image-analyzer:8001/analyze-image"
METADATA_API_URL = "http://metadata-extractor:8003/extract-metadata"

class InputText(BaseModel):
    text: str

@app.post("/api/metadata")
def forward_metadata(file: UploadFile = File(...)):
    files = {'file': (file.filename, file.file, file.content_type)}
    response = requests.post(METADATA_API_URL, files=files)
    if response.status_code != 200:
        return {"error": "metadata-extractor error", "details": response.text}
    return response.json()

@app.post("/api/image")
def forward_image_analysis(file: UploadFile = File(...)):
    files = {'file': (file.filename, file.file, file.content_type)}
    response = requests.post(IMAGE_API_URL, files=files)
    if response.status_code != 200:
        return {"error": "image-analyzer error", "details": response.text}
    return response.json()

def delivery_report(err, msg):
    if err is not None:
        print(f"Kafka error: {err}")
    else:
        print(f"Kafka OK: {msg.topic()} [{msg.partition()}]")

@app.post("/api/async-image")
async def async_image_process(file: UploadFile = File(...)):
    temp = tempfile.NamedTemporaryFile(delete=False)
    temp.write(await file.read())
    temp.flush()

    payload = {
        'filename': os.path.basename(file.filename),
        'path': temp.name
    }

    producer.produce('image-topic', value=json.dumps(payload), callback=delivery_report)
    producer.flush()

    return {"message": "Image envoyée à Kafka pour traitement"}
