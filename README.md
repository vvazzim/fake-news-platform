
# Fake News Detection Platform

## 🚀 Project Overview

The Fake News Detection Platform is a distributed application designed to detect fake news using advanced natural language processing (NLP) models. The platform combines Big Data processing techniques with a modern web dashboard to display predictions and model performance metrics.

### 💡 Objectives

- Detect fake news using pre-trained NLP models (BERT, RoBERTa, Factify).
- Process large volumes of data efficiently using a microservices architecture.
- Visualize prediction results and model performance metrics through an interactive web dashboard.
- Provide real-time text analysis and visualization of results.

---

## 🏗️ Architecture

The platform is divided into two main parts:

1. **Backend:** Microservices architecture using FastAPI, Kafka (KRaft mode), PostgreSQL.
2. **Frontend:** Interactive dashboard inspired by modern web UI practices, using React.

### 🌐 Backend

- **Microservices:**
  - `text-analyzer`: Main microservice for text-based fake news detection.
  - `fusion-analyzer`: Combines predictions from multiple models.
  - `api-gateway`: Routes API requests to appropriate services.
  - **Message Broker:** Kafka (configured in KRaft mode).
  - **Database:** PostgreSQL for storing predictions.

### 🖥️ Frontend

- Built with **React**, inspired by modern dashboard designs.
- Real-time prediction testing and performance visualization.
- Model comparison and interactive charts for better insights.

---

## 📝 Prerequisites

- Docker & Docker Compose
- Python 3.10+
- Node.js and npm

---

## 🧩 Installation

1. Clone the repository:
```bash
git clone https://github.com/vvazzim/fake-news-platform.git
cd fake-news-platform
```

2. Set up environment variables:
Create a `.env` file in the project root:
```
HF_TOKEN=<your-huggingface-token>
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=image_db
```

3. Build and start the services:
```bash
docker-compose up --build
```

---

## 📝 Usage

1. Start the services:
```bash
docker-compose up
```

2. Access the dashboard:
URL: `http://localhost:3000`
