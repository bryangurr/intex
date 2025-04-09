from azure.storage.blob import BlobServiceClient, ContentSettings
import os

# 👉 Replace these values
AZURE_CONNECTION_STRING = "your_connection_string_here"
CONTAINER_NAME = "your_container_name"
LOCAL_FILE_PATH = "path/to/your/image.jpg"

def upload_blob(file_path):
    try:
        blob_service_client = BlobServiceClient.from_connection_string(AZURE_CONNECTION_STRING)
        container_client = blob_service_client.get_container_client(CONTAINER_NAME)

        blob_name = os.path.basename(file_path)
        blob_client = container_client.get_blob_client(blob_name)

        with open(file_path, "rb") as data:
            blob_client.upload_blob(
                data,
                overwrite=True,
                content_settings=ContentSettings(content_type="image/jpeg")
            )

        blob_url = f"{blob_client.url}"
        print(f"✅ Upload complete: {blob_url}")

    except Exception as e:
        print(f"❌ Upload failed: {e}")

FOLDER_PATH = "C:/Users/bryan/Downloads/Movie Posters"

for filename in os.listdir(FOLDER_PATH):
    if filename.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
        full_path = os.path.join(FOLDER_PATH, filename)
        upload_blob(full_path)
