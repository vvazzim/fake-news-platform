from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import shutil
import os

app = FastAPI()

@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    with open("temp.jpg", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    fake_prediction = "image semble authentique"

    os.remove("temp.jpg")

    return JSONResponse(content={"image_analysis": fake_prediction})
