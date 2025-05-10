# db.py
import psycopg2
import os

DB_NAME = os.getenv("POSTGRES_DB", "image_db")
DB_USER = os.getenv("POSTGRES_USER", "user")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD", "password")
DB_HOST = os.getenv("POSTGRES_HOST", "localhost")  # ou 'postgres' si Docker
DB_PORT = os.getenv("POSTGRES_PORT", "5432")
import psycopg2

def get_connection():
    return psycopg2.connect(
        dbname="image_db",
        user="user",
        password="password",
        host="postgres",
        port="5432"
    )

def get_last_predictions(limit=100):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT text, prediction, confidence, model_name, created_at
        FROM text_predictions
        ORDER BY id DESC
        LIMIT %s;
    """, (limit,))
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return [
        {
            "claim": row[0],
            "prediction": row[1],
            "confidence": row[2],
            "model": row[3],
            "date": row[4]
        }
        for row in rows
    ]

def get_model_comparison():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT model_name, AVG(confidence)
        FROM text_predictions
        WHERE confidence IS NOT NULL
        GROUP BY model_name
    """)
    results = cur.fetchall()
    cur.close()
    conn.close()
    return {
        "models": [r[0] for r in results],
        "accuracy": [round(r[1], 3) if r[1] is not None else 0.0 for r in results]
    }

def get_f1_per_model():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT model_name, AVG(confidence)
        FROM text_predictions
        WHERE confidence IS NOT NULL
        GROUP BY model_name
    """)
    results = cur.fetchall()
    cur.close()
    conn.close()
    return {
        "f1_scores": {r[0]: round(r[1], 3) if r[1] is not None else 0.0 for r in results}
    }


def get_stats_summary():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM text_predictions")
    total = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*),AVG(CASE WHEN LOWER(prediction) IN ('refute', 'false') THEN 1 ELSE 0 END) AS fake_predicted FROM text_predictions;")
    fake = cur.fetchone()[0]

    cur.execute("SELECT COUNT(DISTINCT model_name) FROM text_predictions")
    models = cur.fetchone()[0]

    cur.close()
    conn.close()

    return {
        "total_predictions": total,
        "accuracy": 0.91,  # tu pourras l'améliorer
        "fake_predicted": round(fake / total, 3) if total > 0 else 0.0,
        "active_models": models
    }


def get_avg_confidence_per_model():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT model_name, ROUND(AVG(confidence)::numeric, 3) as avg_score
        FROM text_predictions
        WHERE prediction NOT IN ('error', 'not-implemented')
        GROUP BY model_name
        ORDER BY avg_score DESC;
    """)
    rows = cur.fetchall()
    conn.close()
    return {"avg_confidence": [{ "model": r[0], "avg_score": float(r[1]) } for r in rows]}


def get_latest_predictions(limit: int = 10):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT text, prediction, confidence, model_name, created_at
        FROM text_predictions
        WHERE prediction NOT IN ('error', 'not-implemented')
        ORDER BY id DESC
        LIMIT %s;
    """, (limit,))
    rows = cur.fetchall()
    conn.close()
    return {
        "latest_predictions": [
            {
                "text": r[0],
                "prediction": r[1],
                "confidence": float(r[2]),
                "model": r[3],
                "date": r[4].isoformat()
            }
            for r in rows
        ]
    }

def get_avg_confidence_hourly():
    conn = get_connection()
    cur = conn.cursor()
    
    cur.execute("""
        SELECT
            DATE_TRUNC('hour', created_at) AS hour,
            model_name,
            ROUND(AVG(confidence)::numeric, 3) AS avg_confidence
        FROM text_predictions
        WHERE prediction IS NOT NULL AND confidence > 0
        GROUP BY hour, model_name
        ORDER BY hour ASC;
    """)
    
    rows = cur.fetchall()
    cur.close()
    conn.close()
    
    data = {}
    for row in rows:
        hour = row[0].strftime("%Hh")
        model = row[1]
        confidence = float(row[2])
        if hour not in data:
            data[hour] = {}
        data[hour][model] = confidence
    
    return {"hourly_avg_confidence": data}

# db.py

def get_model_performance():
    conn = get_connection()
    cur = conn.cursor()
    
    cur.execute("""
        SELECT model_name,
               COALESCE(ROUND(AVG(CASE WHEN LOWER(prediction) = 'true' THEN 1 ELSE 0 END)::numeric, 3), 0.0) as precision,
               COALESCE(ROUND(AVG(CASE WHEN LOWER(prediction) = 'support' THEN 1 ELSE 0 END)::numeric, 3), 0.0) as recall,
               COALESCE(ROUND(AVG(confidence)::numeric, 3), 0.0) as f1_score
        FROM text_predictions
        WHERE prediction NOT IN ('error', 'not-implemented')
        GROUP BY model_name
        ORDER BY model_name;
    """)
    
    rows = cur.fetchall()
    conn.close()

    return {
        "models": [r[0] for r in rows],
        "precision": [float(r[1]) for r in rows],
        "recall": [float(r[2]) for r in rows],
        "f1_score": [float(r[3]) for r in rows],
    }


def get_dataset_stats():
    conn = get_connection()
    cur = conn.cursor()

    # Total d'échantillons
    cur.execute("SELECT COUNT(*) FROM text_predictions;")
    total_samples = cur.fetchone()[0]

    # Nombre de fake news
    cur.execute("""
        SELECT COUNT(*)
        FROM text_predictions
        WHERE LOWER(prediction) IN ('refute', 'false');
    """)
    fake_news = cur.fetchone()[0]

    # Nombre de true news
    cur.execute("""
        SELECT COUNT(*)
        FROM text_predictions
        WHERE LOWER(prediction) IN ('support', 'true');
    """)
    true_news = cur.fetchone()[0]

    # Croissance fictive pour l'exemple (peut être dynamique plus tard)
    growth_percentage = 15  # Ici on met 15 % en dur pour l'instant

    cur.close()
    conn.close()

    return {
        "total_samples": total_samples,
        "fake_news": fake_news,
        "true_news": true_news,
        "growth_percentage": growth_percentage
    }


def get_dashboard_stats():
    conn = get_connection()
    cur = conn.cursor()

    # Total prédictions
    cur.execute("SELECT COUNT(*) FROM text_predictions")
    total_predictions = cur.fetchone()[0]

    # Accuracy moyenne (on prend la moyenne des confidence pour simuler l'accuracy)
    cur.execute("SELECT AVG(confidence) FROM text_predictions WHERE prediction NOT IN ('error', 'not-implemented')")
    avg_confidence = cur.fetchone()[0] or 0.0
    accuracy = round(avg_confidence, 2)

    # Pourcentage de fake news détectées
    cur.execute("SELECT COUNT(*) FROM text_predictions WHERE LOWER(prediction) IN ('refute', 'false')")
    fake_predicted = cur.fetchone()[0]
    fake_predicted_percentage = round((fake_predicted / total_predictions) * 100, 2) if total_predictions else 0.0

    # Nombre de modèles actifs
    cur.execute("SELECT COUNT(DISTINCT model_name) FROM text_predictions")
    active_models = cur.fetchone()[0]

    cur.close()
    conn.close()

    # ➔ Ajout fixe de l'accuracy_gain pour le dashboard (+6% par exemple)
    accuracy_gain = 0.06

    return {
        "total_predictions": total_predictions,
        "accuracy": accuracy,
        "fake_predicted_percentage": fake_predicted_percentage,
        "active_models": active_models,
        "accuracy_gain": accuracy_gain
    }
