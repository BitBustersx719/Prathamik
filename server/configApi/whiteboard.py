from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename
import pytesseract
from PIL import Image
import io
import requests
AllOWED_EXTENSION= (['text','png','jpg','jpeg','gif','pdf'])
app = Flask(__name__)

@app.route('/ocr', methods=['POST'])
def ocr():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'})

    image = request.files['image']
    img = Image.open(image)
    text = pytesseract.image_to_string(image=img)

    return jsonify({'text': text})

@app.route('/test', methods=['POST'])
def test():
    image_data = request.files['image']
    img = Image.open(image_data)
    img_bytes = io.BytesIO()
    img.save(img_bytes, format='PNG')
    img_bytes.seek(0)

    return send_file(img_bytes, mimetype='image/png')

@app.route('/upload', methods=['POST'])
def upload():
    url = "http://127.0.0.1:5000/test"

    payload = {
        "file": request.files['image']
    }

    response = requests.post(url, files=payload)

    return response.text, response.status_code

if __name__ == '__main__':
    app.run(debug=True)
