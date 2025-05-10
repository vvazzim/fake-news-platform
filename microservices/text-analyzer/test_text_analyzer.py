import requests

text = "COVID-19 vaccines are safe and effective."
response = requests.post(
    "http://localhost:8004/analyze-text",
    json={"text": text}
)

print(response.status_code)
print(response.json())
