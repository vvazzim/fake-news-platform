CREATE TABLE IF NOT EXISTS text_predictions (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    model VARCHAR(255) NOT NULL,
    prediction VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE text_predictions ADD COLUMN model VARCHAR(255);

ALTER TABLE text_predictions
ADD COLUMN confidence FLOAT DEFAULT 1.0,
ADD COLUMN model_name TEXT,
ADD COLUMN f1 FLOAT;


CREATE TABLE IF NOT EXISTS model_metrics (
    model_name TEXT PRIMARY KEY,
    accuracy FLOAT,
    f1_score FLOAT
);
