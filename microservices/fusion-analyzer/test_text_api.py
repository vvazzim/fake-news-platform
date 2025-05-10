import requests

url = "http://localhost:8005/analyze-fake-news"
image_path = "test1.png"
text = "Vaccines cause autism"

with open(image_path, "rb") as f:
    response = requests.post(
        url,
        files={
            "file": (image_path, f, "image/png"),
            "text": (None, text)
        }
    )

print(response.json())
