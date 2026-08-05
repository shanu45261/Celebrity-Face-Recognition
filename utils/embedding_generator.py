import os
import numpy as np
from deepface import DeepFace

DATASET_PATH = "dataset"
EMBEDDINGS_PATH = "embeddings"


def generate_embeddings():
    if not os.path.exists(EMBEDDINGS_PATH):
        os.makedirs(EMBEDDINGS_PATH)

    for person_name in os.listdir(DATASET_PATH):
        person_folder = os.path.join(DATASET_PATH, person_name)

        if not os.path.isdir(person_folder):
            continue

        embeddings = []

        for img_name in os.listdir(person_folder):
            img_path = os.path.join(person_folder, img_name)

            try:
                representation = DeepFace.represent(
                    img_path=img_path,
                    model_name="Facenet",
                    detector_backend="retinaface",
                    enforce_detection=True
                )

                embeddings.append(representation[0]["embedding"])

            except Exception as e:
                print(f"Skipping {img_path}: {e}")

        if embeddings:
            mean_embedding = np.mean(embeddings, axis=0)
            save_path = os.path.join(EMBEDDINGS_PATH, f"{person_name}.npy")
            np.save(save_path, mean_embedding)
            print(f"Saved embedding for {person_name}")

    print("Embedding generation completed.")


if __name__ == "__main__":
    generate_embeddings()
