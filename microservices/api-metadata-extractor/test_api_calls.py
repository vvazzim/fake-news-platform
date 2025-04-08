import requests

image_path = "images/test_exif.jpg"

with open(image_path, "rb") as f:
    files = {"file": ("test_exif.jpg", f, "image/jpeg")}
    response = requests.post("http://localhost:8002/api/metadata", files=files)
    print("📎 /api/metadata Response:", response.status_code, response.json())
