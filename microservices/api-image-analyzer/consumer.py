from confluent_kafka import Consumer
import requests
import json
import os
import time
import psycopg2

# 🔧 Kafka config
consumer_conf = {
    'bootstrap.servers': 'kafka:9092',
    'group.id': 'image-analyzer-group',
    'auto.offset.reset': 'earliest',
    'api.version.request': False  # 🩹 Pour éviter l'erreur d'ApiVersionRequest
}

# 📡 Initialisation du consumer
consumer = Consumer(consumer_conf)
consumer.subscribe(['image-topic'])
print("🔁 [Kafka] En écoute sur le topic 'image-topic'...")

while True:
    try:
        msg = consumer.poll(1.0)

        if msg is None:
            print("🕐 Aucun message reçu...")
            continue
        if msg.error():
            print("❌ Kafka error:", msg.error())
            continue

        print("📩 Message brut reçu !")
        raw_data = msg.value().decode('utf-8')
        print("🧾 Contenu brut :", raw_data)

        data = json.loads(raw_data)
        filename = data.get('filename')
        path = data.get('path')

        if not os.path.exists(path):
            print(f"⚠️ Fichier introuvable : {path}")
            continue

        print(f"🔎 Analyse du fichier : {path} (enregistré comme '{filename}')")

        # 📤 Envoi de l'image pour analyse
        with open(path, 'rb') as f:
            response = requests.post(
                "http://image-analyzer:8001/analyze-image",
                files={'file': (filename, f)}
            )

        result = response.json()
        print("✅ [Analyse terminée]")
        print("📊 Réponse :", result)

        # 💾 Insertion dans PostgreSQL
        conn = psycopg2.connect(
            dbname="image_db",
            user="user",
            password="password",
            host="postgres",
            port="5432"
        )
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO image_results (filename, result)
            VALUES (%s, %s)
        """, (filename, json.dumps(result)))
        print(f"📝 Insertion dans la base avec filename = '{filename}'")
        conn.commit()
        cur.close()
        conn.close()
        
        print("💾 Insertion dans PostgreSQL :")
        print("   filename:", filename)
        print("   result:", result)


    except Exception as e:
        print("💥 Erreur de traitement :", e)

    time.sleep(0.5)
