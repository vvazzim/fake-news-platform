import psycopg2, json

conn = psycopg2.connect(
    dbname="image_db",
    user="user",
    password="password",
    host="localhost",  # ou 'postgres' si lancé dans Docker
    port="5432"
)
cur = conn.cursor()
cur.execute(
    "INSERT INTO image_results (filename, result) VALUES (%s, %s)",
    ('test.jpg', json.dumps({"message": "OK"}))
)
conn.commit()
cur.close()
conn.close()
print("✅ Test d'insertion réussi.")
