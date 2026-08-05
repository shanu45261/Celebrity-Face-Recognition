from flask import Flask, render_template, request, redirect, url_for, jsonify, send_from_directory
from flask_cors import CORS
from utils.matcher import recognize_face
import os
from werkzeug.utils import secure_filename
from flask import Response
from utils.camera import generate_frames
import json
import base64
from io import BytesIO
from PIL import Image


app = Flask(__name__, static_folder='frontend/dist', static_url_path='/')
CORS(app)

UPLOAD_FOLDER = "static/uploads"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


# Home page - serve React app
@app.route('/')
def index():
    return send_from_directory('frontend/dist', 'index.html')


# Serve React static assets and handle SPA routing
@app.route('/<path:path>')
def serve_static(path):
    # Don't serve static files for API routes
    if path.startswith('api/'):
        return {'error': 'Not Found'}, 404
    
    file_path = os.path.join('frontend/dist', path)
    
    # If file exists, serve it
    if os.path.isfile(file_path):
        return send_from_directory('frontend/dist', path)
    
    # If file doesn't exist, serve index.html (SPA routing)
    return send_from_directory('frontend/dist', 'index.html')


# API endpoint for face recognition
@app.route('/api/recognize', methods=['POST'])
def api_recognize():
    """
    Expects either:
    1. JSON with 'image' field containing base64 data
    2. Multipart form data with 'file' field
    """
    try:
        if request.is_json:
            # Handle base64 image from React frontend
            data = request.get_json()
            image_data = data.get('image')
            
            if not image_data:
                return jsonify({'error': 'No image data provided'}), 400
            
            # Remove data URL prefix if present
            if ',' in image_data:
                image_data = image_data.split(',')[1]
            
            # Decode base64 and save temporarily
            image_bytes = base64.b64decode(image_data)
            img = Image.open(BytesIO(image_bytes))
            
            # Save to temp file
            temp_path = os.path.join(app.config['UPLOAD_FOLDER'], 'temp_image.jpg')
            img.save(temp_path)
            
            # Recognize face
            name, confidence = recognize_face(temp_path)
            
            # Clean up
            if os.path.exists(temp_path):
                os.remove(temp_path)
            
            return jsonify({
                'name': name,
                'confidence': float(confidence),
                'category': 'Other'  # You can update this based on the name
            })
        
        else:
            # Handle file upload
            if 'file' not in request.files:
                return jsonify({'error': 'No file provided'}), 400
            
            file = request.files['file']
            if file.filename == '':
                return jsonify({'error': 'No file selected'}), 400
            
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            
            # Recognize face
            name, confidence = recognize_face(file_path)
            
            return jsonify({
                'name': name,
                'confidence': float(confidence),
                'category': 'Other',
                'image_path': f'uploads/{filename}'
            })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Legacy upload route (for backward compatibility)
# Legacy upload route (for backward compatibility)
@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Fix Windows backslash issue
        relative_path = os.path.join('uploads', filename).replace("\\", "/")

        name, confidence = recognize_face(file_path)
        return render_template('result.html', name=name, confidence=confidence, img_path=relative_path)

@app.route('/video_feed')
def video_feed():
    return Response(
        generate_frames(),
        mimetype='multipart/x-mixed-replace; boundary=frame'
    )


# Webcam route placeholder
@app.route('/webcam')
def webcam():
    return render_template('webcam.html')


if __name__ == "__main__":
    app.run(debug=True)
