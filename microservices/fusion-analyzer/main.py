from fastapi import FastAPI, File, UploadFile, Form
from pydantic import BaseModel
import requests
from db import insert_prediction

app = FastAPI()

TEXT_ANALYZER_URL = "http://text-analyzer:8004/analyze-text"
IMAGE_ANALYZER_URL = "http://image-analyzer:8001/analyze-image"

@app.post("/analyze-fake-news")
async def analyze_fake_news(
    text: str = Form(...), 
    file: UploadFile = File(...)
):
    # Analyse texte
    text_response = requests.post(TEXT_ANALYZER_URL, json={"text": text})
    text_result = text_response.json()

    # Analyse image
    image_response = requests.post(
        IMAGE_ANALYZER_URL,
        files={"file": (file.filename, file.file, file.content_type)}
    )
    image_result = image_response.json()

    # Extraction des prédictions
    text_pred = text_result.get("prediction", "")
    image_pred = image_result.get("image_analysis", "")


    # Logique de fusion simple
    if "refute" in [text_pred, image_pred]:
        final = "refutes"
    elif "support" in [text_pred, image_pred]:
        final = "supports"
    else:
        final = "not-enough-info"

    # 🔄 Insertion dans la base de données
    insert_prediction(
        claim_text=text,
        image_filename=file.filename,
        text_pred=text_pred,
        image_pred=image_pred,
        final_pred=final
    )

    # ✅ Retour final
    return {
        "claim": text,
        "text_prediction": text_pred,
        "image_analysis": image_result.get("result", {}),
        "final_decision": final
    }
