from transformers import pipeline

model = pipeline("text-classification", model="bhadresh-savani/distilbert-base-uncased-emotion")
print(model("The vaccine helps protect everyone and is very effective."))
