import psycopg2
from datetime import datetime

def get_connection():
    return psycopg2.connect(
        dbname="image_db",
        user="user",
        password="password",
        host="postgres",
        port="5432"
    )

def get_last_predictions(limit: int = 100):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT text, prediction, confidence, model_name, created_at
        FROM text_predictions WHERE prediction != 'error' AND confidence IS NOT NULL ORDER BY id DESC LIMIT %s;
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

def get_stats_summary():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*), AVG(CASE WHEN prediction = 'refute' THEN 1 ELSE 0 END) FROM text_predictionsWHERE prediction != 'error' AND confidence IS NOT NULL;")
    total, fake_predicted = cur.fetchone()
    cur.execute("SELECT COUNT(DISTINCT model_name) FROM text_predictions WHERE prediction != 'error' AND confidence IS NOT NULL;")
    models = cur.fetchone()[0]
    cur.close()
    conn.close()
    return {
        "total_predictions": total,
        "accuracy": 0.91,  # Tu peux améliorer ça plus tard
        "fake_predicted": fake_predicted,
        "active_models": models
    }

def get_model_comparison():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT model_name, AVG(confidence) as avg_score FROM text_predictions WHERE prediction != 'error' AND confidence IS NOT NULL GROUP BY model_name;")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return {
        "models": [r[0] for r in rows],
        "accuracy": [round(r[1], 2) for r in rows]
    }

def get_f1_per_model():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT model_name, AVG(confidence) FROM text_predictions WHERE prediction != 'error' AND confidence IS NOT NULL GROUP BY model_name;")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return {
        "f1_scores": {r[0]: round(r[1], 2) for r in rows}
    }