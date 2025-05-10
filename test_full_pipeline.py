import requests
import os
import time
import psycopg2

# 🔧 Chemins
filename = os.path.basename("microservices/images/test_exif.jpg")
filepath = f"microservices/api-metadata-extractor/images/{filename}"

# ✅ On vérifie que le fichier existe
if not os.path.exists(filepath):
    print(f"🚫 Fichier introuvable : {filepath}")
    exit()

# 📎 Test metadata
print("📎 Test /api/metadata ...")
try:
    res = requests.post("http://localhost:8003/extract-metadata", files={"file": open(filepath, "rb")})
    print("➡️ Réponse /api/metadata :", res.json())
except Exception as e:
    print("🚫 Erreur /api/metadata :", e)

# 📤 Envoi image à Kafka via API Gateway
print("📤 Test /api/async-image ...")
try:
    res = requests.post("http://localhost:8002/api/async-image", files={"file": open(filepath, "rb")})
    print("➡️ Réponse /api/async-image :", res.json())
except Exception as e:
    print("🚫 Erreur /api/async-image :", e)

# 🕒 Attente pour laisser le worker insérer dans la DB
print("⏳ Attente de 5 secondes pour traitement Kafka + worker...")
time.sleep(5)

# 🧾 Vérif PostgreSQL sur le bon fichier
print(f"🧾 Vérification de l’image '{filename}' dans PostgreSQL...")
try:
    conn = psycopg2.connect(
        dbname="image_db",
        user="user",
        password="password",
        host="localhost",
        port="5432"
    )
    cur = conn.cursor()
    cur.execute("SELECT id, filename, result, timestamp FROM image_results WHERE filename = %s ORDER BY id DESC LIMIT 1;", (filename,))
    print("💾 Insertion dans PostgreSQL :")
    print("   filename:", filename)
    row = cur.fetchone()
    print("📌 Enregistrement correspondant :", row)
    conn.close()
except Exception as e:
    print("🚫 Erreur PostgreSQL :", e)
