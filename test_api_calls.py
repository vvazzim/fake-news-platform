import requests

GATEWAY_URL = "http://localhost:8002"
IMAGE_PATH = "test1.png"  # ⚠️ Mets ici le chemin de ton image locale

# 1. Test /api/image (sync)
def test_image_endpoint():
    url = f"{GATEWAY_URL}/api/image"
    files = {'file': open(IMAGE_PATH, 'rb')}
    response = requests.post(url, files=files)
    print("🔍 /api/image Response:", response.status_code, response.json())

# 2. Test /api/async-image (async)
def test_async_image_endpoint():
    url = f"{GATEWAY_URL}/api/async-image"
    files = {'file': open(IMAGE_PATH, 'rb')}
    response = requests.post(url, files=files)
    print("🔁 /api/async-image Response:", response.status_code, response.json())

# 3. Test /api/metadata
def test_metadata_endpoint():
    url = f"{GATEWAY_URL}/api/metadata"
    files = {'file': open(IMAGE_PATH, 'rb')}
    response = requests.post(url, files=files)
    print("📎 /api/metadata Response:", response.status_code, response.json())

if __name__ == "__main__":
    print("🚀 Testing API Gateway endpoints with real image...\n")
    test_image_endpoint()
    test_async_image_endpoint()
    test_metadata_endpoint()
