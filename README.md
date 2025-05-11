
# Fake News Detection Platform

## 🚀 Project Overview

The Fake News Detection Platform is a distributed application designed to detect fake news using state-of-the-art natural language processing models. The project combines Big Data processing techniques with a modern web dashboard to display predictions and model performance metrics.

### 💡 Objectives

- Identify fake news using pre-trained NLP models (BERT, RoBERTa, Factify).
- Process large volumes of data efficiently using microservices.
- Visualize prediction results and model performance metrics through an interactive web dashboard.
- Provide real-time text analysis and visualization of results.

---

## 🏗️ Architecture

The platform is structured into two main parts:

1. **Backend:** Microservices architecture using FastAPI, Kafka, PostgreSQL.
2. **Frontend:** Interactive dashboard built with React (Vision UI Dashboard template).

### 🌐 Backend

- **Microservices:**
  - `text-analyzer`: Main microservice for fake news detection.
  - `fusion-analyzer`: Combines predictions from multiple models.
  - `api-gateway`: Manages API requests and forwards them to appropriate services.
  - **Message Broker:** Kafka (configured in KRaft mode).
  - **Database:** PostgreSQL for storing predictions.

### 🖥️ Frontend

- Built with **React** using the Vision UI Dashboard template.
- Provides real-time prediction testing, performance visualization, and model comparison.

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

## 🚦 Running the Application

1. Start the services:

```bash
docker-compose up
```

2. Access the dashboard:

URL: `http://localhost:3000`

### 📝 Testing API Endpoints

Use Postman or curl to test the prediction API:

```bash
curl -X POST http://localhost:8004/predict -d '{"text": "The vaccine couldn't protect people against viruses."}'
```

---

## 🗂️ Data Flow

1. User submits text via the dashboard.
2. Text is sent to `text-analyzer` via API Gateway.
3. Predictions are stored in PostgreSQL.
4. Results are displayed on the dashboard in real time.

---

## 📊 Visualization

- Real-time chart updates on prediction performance.
- Detailed breakdown of model metrics (accuracy, F1-score).

---

## 🔧 Troubleshooting

- **Database Connection Issues:** Check if the PostgreSQL container is running.
- **Model Loading Errors:** Verify the HF_TOKEN environment variable.

---

## 📄 License

MIT License

## 💬 Contact

For questions or collaboration, open an issue on GitHub.
