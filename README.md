# 🎭 Celebrity Face Recognition Framework

> An AI-powered web application that recognizes celebrities from uploaded images using **DeepFace**, **FaceNet embeddings**, and **RetinaFace** with a modern React frontend and Flask backend.

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![Flask](https://img.shields.io/badge/Flask-Backend-black?logo=flask)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)
![DeepFace](https://img.shields.io/badge/DeepFace-Face%20Recognition-success)
![OpenCV](https://img.shields.io/badge/OpenCV-Computer%20Vision-green?logo=opencv)

---

# 📖 Overview

Celebrity Face Recognition Framework is an end-to-end AI application that identifies celebrities from uploaded images using deep learning-based facial embeddings.

Instead of relying on traditional image classification, the system generates high-dimensional facial embeddings using **FaceNet**, detects faces with **RetinaFace**, and compares them against a precomputed celebrity embedding database using cosine similarity.

The application provides an intuitive web interface where users can upload an image and instantly receive the closest celebrity match along with similarity confidence.

---

# ✨ Features

- 🔍 Celebrity face recognition from uploaded images
- 🧠 FaceNet embedding generation
- 👤 RetinaFace face detection
- ⚡ Fast embedding-based similarity search
- 📷 Supports multiple image formats
- 🎯 High accuracy using cosine similarity
- 💻 Modern React + TypeScript frontend
- 🌐 Flask REST API backend
- 📁 Pre-generated embeddings for faster inference
- 📈 Easily extendable with new celebrity datasets

---

# 🏗️ System Architecture

```
                User Upload
                     │
                     ▼
           React Frontend (TypeScript)
                     │
          HTTP Request (REST API)
                     │
                     ▼
              Flask Backend
                     │
         RetinaFace Face Detection
                     │
                     ▼
        FaceNet Embedding Extraction
                     │
                     ▼
      Compare with Stored Embeddings
                     │
                     ▼
      Cosine Similarity Calculation
                     │
                     ▼
          Best Celebrity Match
                     │
                     ▼
          Display Result to User
```

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- HTML5
- CSS3

## Backend

- Python
- Flask
- DeepFace
- OpenCV

## AI / Machine Learning

- FaceNet
- RetinaFace
- Cosine Similarity
- DeepFace

---

# 📂 Project Structure

```
celeb_face_recognition/
│
├── frontend/                 # React frontend
├── templates/                # HTML templates
├── static/                   # CSS, JS and assets
├── utils/                    # Utility functions
│
├── app.py                    # Flask application
├── requirements.txt          # Python dependencies
├── test_deepface.py          # Model testing
│
├── INTEGRATION_GUIDE.md
├── INTEGRATION_CHANGES.md
│
└── README.md
```

---

# ⚙️ How It Works

### Step 1

User uploads an image.

↓

### Step 2

RetinaFace detects and aligns the face.

↓

### Step 3

DeepFace generates a FaceNet embedding.

↓

### Step 4

The embedding is compared against the stored celebrity embeddings.

↓

### Step 5

Cosine similarity identifies the closest celebrity.

↓

### Step 6

The predicted celebrity and similarity score are displayed.

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/celebrity_face_recognition.git

cd celebrity_face_recognition
```

---

## Create Virtual Environment

Windows

```bash
python -m venv venv
venv\Scripts\activate
```

Linux / macOS

```bash
python3 -m venv venv

source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Start Backend

```bash
python app.py
```

---

## Start Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🖥️ Usage

1. Open the web application.
2. Upload a celebrity image.
3. Wait for processing.
4. View the predicted celebrity.
5. See the similarity confidence score.

---

# 📊 Recognition Pipeline

```
Image
  │
  ▼
RetinaFace
  │
  ▼
Face Alignment
  │
  ▼
FaceNet
  │
  ▼
Embedding
  │
  ▼
Embedding Database
  │
  ▼
Cosine Similarity
  │
  ▼
Prediction
```

---

# 📈 Future Improvements

- Multiple face recognition
- Real-time webcam recognition
- GPU acceleration
- Top-5 prediction results
- Liveness detection
- Emotion recognition
- Celebrity information integration
- Larger celebrity dataset
- Mobile responsive interface
- Docker deployment
- Cloud deployment (AWS/GCP/Azure)

---

# 🎯 Applications

- Face Recognition Research
- AI Learning Projects
- Computer Vision Demonstrations
- Smart Attendance Systems
- Identity Verification
- Digital Media Analysis
- Educational AI Projects

---

# 📚 Key Technologies

| Technology | Purpose |
|------------|----------|
| DeepFace | Facial recognition framework |
| FaceNet | Face embedding generation |
| RetinaFace | Face detection |
| Flask | Backend API |
| React | Frontend UI |
| TypeScript | Frontend development |
| OpenCV | Image processing |
| Python | Backend logic |

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to improve the project:

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---

# 👨‍💻 Authors

### **Shanu Appikonda**
**AI Engineer | Software Developer | Salesforce Certified Platform Developer I**

🔗 LinkedIn:  
https://www.linkedin.com/in/sumanohari-shanu-appikonda-861b61259/

---

**Mithilesh Maddipati**

AI Engineer | Salesforce Certified Platform Developer I | ServiceNow Certified Application Developer | ServiceNow Certified System Administrator

LinkedIn:
> https://linkedin.com/in/mithilesh-maddipati-283177259/

Portfolio:
> https://mithileshportfolio001.netlify.app/

---

### **M Sai Raja Karthik**
**AI Engineer | Software Developer | Cloud Developer**

🔗 LinkedIn:  
https://www.linkedin.com/in/sai-raja-karthik-936588314/

---

### **K Mruthyum Jaya Rani**
**AI Engineer | Software Developer**

🔗 LinkedIn:  
https://www.linkedin.com/in/rani-reddy-778b62259/

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future development.

---

## License

This project is intended for educational and research purposes.
