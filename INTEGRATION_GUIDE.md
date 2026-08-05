# React + Flask Integration Guide

## Overview
Your project now has a fully integrated React frontend with Flask backend for celebrity face recognition.

### Architecture
- **Backend**: Flask (Python) - Handles face recognition using DeepFace
- **Frontend**: React/TypeScript (Vite) - Modern UI for image upload and results display
- **Communication**: REST API via `/api/recognize` endpoint

---

## Setup Instructions

### 1. Install Dependencies

#### Backend (Flask)
```bash
pip install -r requirements.txt
```

#### Frontend (React)
```bash
cd frontend
npm install
cd ..
```

### 2. Build the React App

Before running Flask in production, build the React app:

```bash
cd frontend
npm run build
cd ..
```

This creates the `frontend/dist` folder that Flask will serve.

### 3. Running in Development Mode

**Terminal 1 - Flask Backend** (handles API requests):
```bash
python app.py
# Runs on http://localhost:5000
```

**Terminal 2 - React Development Server** (with hot reload):
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

Vite's proxy (configured in `vite.config.ts`) automatically forwards API calls to Flask.

### 4. Production Deployment

For production, Flask serves both the React app and API:

```bash
python app.py
# Visit http://localhost:5000
```

Flask will:
- Serve the built React app from `frontend/dist`
- Handle all API requests at `/api/recognize`
- Support file uploads and video streaming

---

## API Endpoints

### POST `/api/recognize`
Recognizes faces in uploaded images.

**Request (JSON):**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Request (Form Data):**
```
file: <binary image data>
```

**Response:**
```json
{
  "name": "Elon Musk",
  "confidence": 0.92,
  "category": "Tech",
  "image_path": "uploads/image.jpg"
}
```

### GET `/api/video_feed`
Streams live webcam feed (for webcam feature).

---

## How It Works

### Frontend Flow
1. User uploads image or captures from webcam
2. React converts image to base64
3. Sends to `/api/recognize` endpoint
4. Receives recognition result from Flask backend
5. Displays celebrity name, confidence, and description

### Backend Flow
1. Receives base64 image at `/api/recognize`
2. Decodes and saves temporarily
3. Uses DeepFace + Facenet model to generate embedding
4. Compares with stored embeddings in `embeddings/` folder
5. Returns best match with cosine similarity score

---

## File Structure

```
c:\Projects\celebrity_face_recognition\
├── app.py                          # Flask app with React + API
├── requirements.txt                # Python dependencies
├── frontend/                       # React app
│   ├── dist/                       # Built React app (created by npm run build)
│   ├── src/
│   │   ├── App.tsx
│   │   ├── services/
│   │   │   └── geminiService.ts   # Updated to call Flask API
│   │   └── ...
│   ├── package.json
│   ├── vite.config.ts             # Updated with API proxy
│   └── tsconfig.json
├── utils/
│   ├── matcher.py                 # Face recognition logic
│   ├── embedding_generator.py     # Generate embeddings
│   └── camera.py                  # Webcam handling
├── embeddings/                    # Pre-generated face embeddings
│   ├── elon_musk.npy
│   └── tom_cruise.npy
├── dataset/                       # Training images
├── static/
│   └── uploads/                   # Uploaded images
└── templates/                     # Legacy Flask templates
```

---

## Configuration

### Vite Proxy (Development)
In `frontend/vite.config.ts`:
```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      rewrite: (path) => path
    }
  }
}
```

This redirects API calls from `http://localhost:3000/api/...` to `http://localhost:5000/api/...`

### Flask CORS
Flask-cors is enabled to allow cross-origin requests:
```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
```

---

## Adding New Celebrities

### 1. Generate Embeddings
Place celebrity photos in `dataset/<celebrity_name>/` folder.

```bash
python utils/embedding_generator.py
```

This creates `embeddings/<celebrity_name>.npy`

### 2. Update Frontend Mapping (Optional)
Edit `frontend/services/geminiService.ts`:
```typescript
function mapNameToCategory(name: string): CelebrityCategory {
  const nameMap: { [key: string]: CelebrityCategory } = {
    'Elon Musk': 'Tech',
    'Tom Cruise': 'Action',
    'New Celebrity': 'Category',  // Add here
  };
  return nameMap[name] || 'Other';
}
```

---

## Troubleshooting

### Issue: `ModuleNotFoundError: No module named 'flask_cors'`
**Solution:**
```bash
pip install flask-cors
```

### Issue: React app not loading when visiting `localhost:5000`
**Solution:**
1. Build the React app: `cd frontend && npm run build`
2. Restart Flask: `python app.py`

### Issue: API calls returning 404
**Solution:**
- Ensure Flask is running on port 5000
- Check that the proxy in `vite.config.ts` points to `http://localhost:5000`
- Both development servers must be running

### Issue: Face recognition not working
**Solution:**
1. Check that embeddings exist in `embeddings/` folder
2. Run `python utils/embedding_generator.py` to generate them
3. Ensure `dataset/` folder has properly named subdirectories

---

## Performance Notes

- **Face Detection**: Uses RetinaFace for fast, accurate detection
- **Face Embedding**: Uses FacenetFace model (128-dimensional vector)
- **Matching**: Cosine distance comparison (threshold: 0.4)
- **Inference Time**: ~1-3 seconds per image (depending on hardware)

---

## Next Steps

1. ✅ Build React app: `cd frontend && npm run build`
2. ✅ Install dependencies: `pip install -r requirements.txt`
3. ✅ Generate embeddings: `python utils/embedding_generator.py`
4. ✅ Run Flask: `python app.py`
5. Visit `http://localhost:5000`
