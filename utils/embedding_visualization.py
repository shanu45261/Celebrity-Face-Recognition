import os
import numpy as np
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA

# Path to embeddings directory
EMBEDDINGS_DIR = "embeddings"

X = []      # feature vectors
y = []      # labels (celebrity names)

print("🔍 Loading embeddings...")

# Loop through all embedding files
for file in os.listdir(EMBEDDINGS_DIR):
    if file.endswith(".npy"):
        name = file.replace(".npy", "")
        path = os.path.join(EMBEDDINGS_DIR, file)

        embeddings = np.load(path)

        # ✅ FIX: Ensure embeddings are always 2D
        if embeddings.ndim == 1:
            embeddings = embeddings.reshape(1, -1)

        for emb in embeddings:
            X.append(emb)
            y.append(name)

# Convert to NumPy array
X = np.array(X)

# 🚨 Safety check
if X.shape[0] < 2:
    raise ValueError(
        "❌ PCA requires at least 2 face embeddings.\n"
        "Add more images per celebrity and regenerate embeddings."
    )

print(f"✅ Total embeddings loaded: {X.shape[0]}")
print(f"✅ Embedding dimension: {X.shape[1]}")

# Apply PCA (128D → 2D)
pca = PCA(n_components=2)
X_2d = pca.fit_transform(X)

# Plot
plt.figure(figsize=(8, 6))

unique_labels = set(y)
for label in unique_labels:
    idx = [i for i, l in enumerate(y) if l == label]
    plt.scatter(X_2d[idx, 0], X_2d[idx, 1], label=label, s=80)

plt.title("Face Embedding Visualization using PCA", fontsize=14)
plt.xlabel("PCA Component 1")
plt.ylabel("PCA Component 2")
plt.legend()
plt.grid(True)
plt.tight_layout()

plt.show()
