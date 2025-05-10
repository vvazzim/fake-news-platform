import psycopg2
import os

DB_NAME = os.getenv("POSTGRES_DB", "fusiondb")
DB_USER = os.getenv("POSTGRES_USER", "user")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD", "password")
DB_HOST = os.getenv("POSTGRES_HOST", "postgres")
DB_PORT = os.getenv("POSTGRES_PORT", "5432")

def get_connection():
    return psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT
    )

def insert_prediction(claim_text, image_filename, text_pred, image_pred, final_pred):
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO predictions (text, image_filename, text_prediction, image_prediction, final_prediction)
            VALUES (%s, %s, %s, %s, %s)
        """, (claim_text, image_filename, text_pred, image_pred, final_pred))
        conn.commit()
        cur.close()
        conn.close()
        print("[✔] Prediction inserted into PostgreSQL")
    except Exception as e:
        print(f"[✖] Failed to insert prediction: {e}")
