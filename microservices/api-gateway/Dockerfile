FROM python:3.9-slim

WORKDIR /app

# Installer bash + netcat-openbsd (pour le script wait-for.sh)
RUN apt-get update && apt-get install -y bash netcat-openbsd && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN chmod +x wait-for.sh


CMD ./wait-for.sh kafka:9092 -- uvicorn main:app --host 0.0.0.0 --port 8000