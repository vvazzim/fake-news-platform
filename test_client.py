import requests
import time

URL = "http://localhost:8004/analyze-text"

texts_to_test = [
    "COVID vaccines are dangerous and not tested enough.",
    "The Earth is flat and NASA is lying to us.",
    "Climate change is a hoax.",
    "The moon landing was real.",
    "Vaccines save lives."
]

for text in texts_to_test:
    payload = {"text": text}
    start = time.time()
    try:
        response = requests.post(URL, json=payload)
        duration = time.time() - start

        if response.status_code == 200:
            print(f"\n✅ Text: {text}")
            print(f"📬 Response: {response.json()}")
            print(f"⏱️ Duration: {duration:.2f} sec")
        else:
            print(f"\n❌ Error {response.status_code} for text: {text}")
            print(response.text)

    except Exception as e:
        print(f"\n❌ Exception for text: {text}")
        print(str(e))
