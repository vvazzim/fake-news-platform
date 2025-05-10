import os
from fastapi.responses import JSONResponse
import requests
from datetime import datetime
from fastapi import FastAPI
from pydantic import BaseModel
from contextlib import asynccontextmanager
from db import (
    get_avg_confidence_per_model,
    get_dashboard_stats,
    get_dataset_stats,
    get_last_predictions,
    get_latest_predictions,
    get_model_comparison,
    get_f1_per_model,
    get_model_performance,
    get_stats_summary,
    get_avg_confidence_hourly,
)
from fastapi.middleware.cors import CORSMiddleware

from db import get_dataset_stats


HF_TOKEN = os.getenv("HF_API_TOKEN")  # assure-toi que c’est bien défini dans l’env Docker

MODELS ={
    "Factify": "MoritzLaurer/DeBERTa-v3-base-mnli-fever-anli",
    "BERT": "typeform/distilbert-base-uncased-mnli",
    "RoBERTa": "facebook/bart-large-mnli"
}

def predict_with_model(text: str, model_path: str, model_name: str):
    headers = {"Authorization": f"Bearer {HF_TOKEN}"}
    payload = {
        "inputs": text,
        "parameters": {
            "candidate_labels": ["true", "false", "not enough information"]
        }
    }

    print(f"🔍 Sending request to Hugging Face for model: {model_path}")

    try:
        response = requests.post(
            f"https://api-inference.huggingface.co/models/{model_path}",
            headers=headers,
            json=payload,
            timeout=20
        )

        if response.status_code != 200:
            print(f"⚠️ HF API returned status {response.status_code}")
            return None, None

        result = response.json()
        if "labels" in result and "scores" in result:
            return result["labels"][0].lower(), result["scores"][0]

    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
    except Exception as e:
        print(f"❌ Parsing failed: {e}")

    return None, None



def log_prediction(text, prediction, confidence, model_name):
    import psycopg2
    conn = psycopg2.connect(
        dbname="image_db", user="user", password="password",
        host="postgres", port="5432"
    )
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO text_predictions (text, prediction, confidence, model_name, created_at)
        VALUES (%s, %s, %s, %s, %s);
    """, (text, prediction, confidence, model_name, datetime.utcnow()))
    conn.commit()
    cur.close()
    conn.close()

class TextInput(BaseModel):
    text: str

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ou ["http://localhost:3000"] selon config
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 🧠 Route de prédiction (appel les 3 modèles)
@app.post("/predict")
@app.post("/predict")
def predict_text(input: TextInput):
    text = input.text
    results = {}

    for model_name, model_path in MODELS.items():
        label, score = predict_with_model(text, model_path, model_name)
        if label and score is not None:
            log_prediction(text, label, score, model_name)
            results[model_name] = {
                "prediction": label,
                "confidence": round(score, 3)
            }
        else:
            results[model_name] = {
                "prediction": "error",
                "confidence": 0.0
            }

    return {
        "text": text,
        "predictions": results
    }


@app.get("/predictions")
def get_predictions():
    return get_last_predictions()

@app.get("/metrics/model-comparison")
def compare_models():
    return get_model_comparison()

@app.get("/metrics/f1")
def get_f1():
    return get_f1_per_model()

@app.get("/stats/summary")
def get_summary():
    return get_stats_summary()

@app.get("/metrics/avg-confidence")
def avg_confidence():
    try:
        return get_avg_confidence_per_model()
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.get("/predictions/latest")
def latest_predictions(limit: int = 10):
    try:
        return get_latest_predictions(limit)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


@app.get("/metrics/avg-confidence/hourly")
def avg_confidence_hourly():
    return get_avg_confidence_hourly()

@app.get("/metrics/model-performance")
def model_performance():
    return get_model_performance()

@app.get("/metrics/dataset-stats")
def dataset_stats():
    return get_dataset_stats()

@app.get("/dashboard/stats")
def dashboard_stats():
    return get_dashboard_stats()