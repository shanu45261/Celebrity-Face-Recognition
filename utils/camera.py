import cv2
import numpy as np
from deepface import DeepFace
import os

# Initialize webcam
camera = cv2.VideoCapture(0)

# ================= CONFIG =================
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EMBEDDINGS_DIR = os.path.join(BASE_DIR, "embeddings")
THRESHOLD = 0.6
# =========================================

# Load stored embeddings
known_embeddings = {}

if not os.path.exists(EMBEDDINGS_DIR):
    raise FileNotFoundError(f"Embeddings folder not found: {EMBEDDINGS_DIR}")

for file in os.listdir(EMBEDDINGS_DIR):
    if file.endswith(".npy"):
        name = file.replace(".npy", "")
        known_embeddings[name] = np.load(
            os.path.join(EMBEDDINGS_DIR, file)
        )

print("✅ Loaded embeddings:", list(known_embeddings.keys()))


def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


def recognize_face_webcam(face_img):
    try:
        embedding = DeepFace.represent(
            img_path=face_img,
            model_name="Facenet",
            enforce_detection=False
        )[0]["embedding"]

        best_match = "Unknown"
        best_score = -1

        for name, embeddings in known_embeddings.items():
            for ref_emb in embeddings:
                score = cosine_similarity(embedding, ref_emb)
                if score > best_score:
                    best_score = score
                    best_match = name

        if best_score < THRESHOLD:
            return "Unknown", 0

        confidence = round(best_score * 100, 2)
        return best_match, confidence

    except Exception as e:
        return "Unknown", 0


def generate_frames():
    while True:
        success, frame = camera.read()
        if not success:
            break

        try:
            detections = DeepFace.extract_faces(
                img_path=frame,
                detector_backend="retinaface",
                enforce_detection=False
            )

            for face in detections:
                fa = face["facial_area"]
                x, y, w, h = fa["x"], fa["y"], fa["w"], fa["h"]

                face_img = frame[y:y+h, x:x+w]

                # Convert BGR → RGB
                face_img = cv2.cvtColor(face_img, cv2.COLOR_BGR2RGB)

                name, confidence = recognize_face_webcam(face_img)

                color = (0, 255, 0) if name != "Unknown" else (0, 0, 255)

                cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)
                cv2.putText(
                    frame,
                    f"{name} ({confidence}%)",
                    (x, y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.8,
                    color,
                    2
                )

        except Exception:
            pass

        ret, buffer = cv2.imencode(".jpg", frame)
        frame = buffer.tobytes()

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n"
        )
