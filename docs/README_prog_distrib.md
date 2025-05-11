
# Fake News Detection Platform - Distributed Systems

## 🛰️ Overview

The Fake News Detection Platform is designed to leverage microservices and distributed computing techniques to analyze and classify news articles in real time. The platform is highly modular and scalable, built to handle high-volume data streams efficiently.

### 💡 Key Concepts

- **Microservices Architecture:** Independent services that handle specific tasks (text analysis, image analysis, data aggregation).
- **Event-Driven Communication:** Uses Kafka as a message broker.
- **Database Integration:** Uses PostgreSQL for storing predictions.

---

## 🏗️ Backend Architecture

### 🔧 Services

- **Text Analyzer (FastAPI):** Analyzes news text and predicts authenticity.
- **Image Analyzer (FastAPI):** Analyzes visual content related to the news.
- **Fusion Analyzer:** Combines results from multiple models.
- **API Gateway:** Central entry point for all API requests.
- **Kafka Broker:** Handles asynchronous communication between services.
- **PostgreSQL Database:** Stores predictions and model statistics.

---

## 🔧 Installation

1. Navigate to the microservices directory:
```bash
cd microservices
```

2. Start the Docker services:
```bash
docker-compose up --build
```

3. Verify that Kafka and PostgreSQL are running:
```bash
docker ps
```
