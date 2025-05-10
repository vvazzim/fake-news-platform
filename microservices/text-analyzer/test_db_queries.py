import psycopg2
from tabulate import tabulate

DB_CONFIG = {
    "dbname": "image_db",
    "user": "user",
    "password": "password",
    "host": "localhost",  # ou 'postgres' si exécuté en Docker
    "port": 5432
}

def run_queries():
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()

    print("\n📌 Moyenne des scores par modèle :")
    cur.execute("""
        SELECT model_name, ROUND(AVG(confidence)::numeric, 3) as avg_score
        FROM text_predictions
        WHERE prediction != 'error' AND confidence IS NOT NULL
        GROUP BY model_name;
    """)
    print(tabulate(cur.fetchall(), headers=["Model", "Avg Confidence"]))

    print("\n📌 Total de prédictions + % de fake news (refute) :")
    cur.execute("""
        SELECT COUNT(*), 
               ROUND(AVG(CASE WHEN prediction = 'refute' THEN 1 ELSE 0 END), 3)
        FROM text_predictions
        WHERE prediction != 'error' AND confidence IS NOT NULL;
    """)
    total, fake_ratio = cur.fetchone()
    print(f"Total prédictions: {total} — % de fake news : {fake_ratio * 100:.1f}%")

    print("\n📌 Nombre de modèles actifs utilisés :")
    cur.execute("""
        SELECT COUNT(DISTINCT model_name) 
        FROM text_predictions
        WHERE prediction != 'error' AND confidence IS NOT NULL;
    """)
    print(f"Modèles actifs : {cur.fetchone()[0]}")

    print("\n📌 5 dernières prédictions valides :")
    cur.execute("""
        SELECT text, prediction, confidence, model_name, created_at
        FROM text_predictions
        WHERE prediction != 'error' AND confidence IS NOT NULL
        ORDER BY id DESC
        LIMIT 5;
    """)
    print(tabulate(cur.fetchall(), headers=["Text", "Prediction", "Conf", "Model", "Date"]))

    cur.close()
    conn.close()

if __name__ == "__main__":
    run_queries()

