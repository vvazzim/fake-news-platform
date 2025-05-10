import requests

url = "http://localhost:8005/analyze-fake-news"
files = {"file": open("microservices/api-metadata-extractor/images/test_exif.jpg", "rb")}
data = {"text": "The moon landing was faked"}

response = requests.post(url, files=files, data=data)

print("Status code:", response.status_code)
print("Response text:", response.text)
