import os
import numpy as np
from deepface import DeepFace
from scipy.spatial.distance import cosine

EMBEDDINGS_PATH = "embeddings"
THRESHOLD = 0.4  # Cosine distance threshold


def load_embeddings():
    embeddings_dict = {}
    for file in os.listdir(EMBEDDINGS_PATH):
        if file.endswith(".npy"):
            name = file.replace(".npy", "")
            vector = np.load(os.path.join(EMBEDDINGS_PATH, file))
            embeddings_dict[name] = vector
    return embeddings_dict


def recognize_face(image_path):
    try:
        # Generate embedding for input image
        rep = DeepFace.represent(
            img_path=image_path,
            model_name="Facenet",
            detector_backend="retinaface",
            enforce_detection=True
        )
        input_embedding = rep[0]["embedding"]

    except Exception as e:
        return "No face detected", 0

    # Load stored embeddings
    embeddings_dict = load_embeddings()

    best_match = "Unknown"
    best_score = 1  # Cosine distance (0 = identical)

    for name, emb in embeddings_dict.items():
        score = cosine(input_embedding, emb)
        if score < best_score:
            best_score = score
            best_match = name

    confidence = round((1 - best_score) * 100, 2)

    if best_score > THRESHOLD:
        best_match = "Unknown"

    return best_match, confidence


# Quick test (optional)
if __name__ == "__main__":
    test_image = "dataset/elon_musk/images (4).jpg"
    name, confidence = recognize_face(test_image)
    print(f"Identified: {name}, Confidence: {confidence}%")
