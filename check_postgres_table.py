import psycopg2
import json

# Connexion PostgreSQL
conn = psycopg2.connect(
    dbname="image_db",
    user="user",
    password="password",
    host="localhost",  # ou 'postgres' en Docker
    port="5432"
)

cur = conn.cursor()

# Liste des enregistrements
cur.execute("SELECT filename, result FROM image_results ORDER BY id DESC LIMIT 5")

rows = cur.fetchall()

if not rows:
    print("❌ Aucun enregistrement trouvé dans image_results.")
else:
    print("✅ Enregistrements trouvés dans image_results :\n")
    for row in rows:
        print("📄 Filename:", row[0])
        # ✅ PAS besoin de json.loads si c’est déjà un dict
        result_str = row[1] if isinstance(row[1], str) else json.dumps(row[1], indent=2)
        print("📊 Result:", result_str)
        print("-" * 50)

cur.close()
conn.close()
