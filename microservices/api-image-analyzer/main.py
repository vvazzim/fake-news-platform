from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import shutil
import os

app = FastAPI()

@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    with open("temp.jpg", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 🖼️ Simulation de l'analyse d'image
    fake_prediction = "real"  # Ou "fake" si tu veux simuler aussi du faux
    fake_confidence = 0.78    # Confiance entre 0 et 1

    os.remove("temp.jpg")

    return JSONResponse(content={
        "result": {
            "prediction": fake_prediction,
            "confidence": fake_confidence
        }
    })
