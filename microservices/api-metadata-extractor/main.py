from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from confluent_kafka import Producer
from PIL import Image
from PIL.ExifTags import TAGS
import tempfile
import io
import json

app = FastAPI()

producer = Producer({'bootstrap.servers': 'kafka:9092'})

# ✅ Fonction récursive pour rendre les valeurs JSON-sérialisables
def make_serializable(obj):
    try:
        json.dumps(obj)  # Test direct
        return obj
    except (TypeError, OverflowError):
        if isinstance(obj, dict):
            return {str(k): make_serializable(v) for k, v in obj.items()}
        elif isinstance(obj, (list, tuple, set)):
            return [make_serializable(v) for v in obj]
        elif hasattr(obj, 'numerator') and hasattr(obj, 'denominator'):
            return float(obj)
        elif isinstance(obj, bytes):
            return obj.decode(errors='ignore')
        else:
            return str(obj)

@app.post("/extract-metadata")
async def extract_metadata(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        exif_data = image._getexif()

        metadata = {}
        if exif_data:
            for tag_id, value in exif_data.items():
                tag = TAGS.get(tag_id, tag_id)
                metadata[tag] = make_serializable(value)
        else:
            metadata["message"] = "No EXIF data found."

        return JSONResponse(content=metadata)

    except Exception as e:
        return JSONResponse(status_code=400, content={
            "error": "metadata-extractor error",
            "details": str(e)
        })

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
