from flask import Flask, request, jsonify
from google.cloud import speech
import pyttsx3
import os
app = Flask(__name__)
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "server\\creds\\speech_to_text.json"
@app.route('/caption', methods=['POST'])
def caption():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'})

    audio = request.files['audio']
    content = audio.read()

    client = speech.SpeechClient()
    audio_data = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.MP3,
        sample_rate_hertz=16000,
        language_code='en-US',
    )

    response = client.recognize(config=config, audio=audio_data)

    captions = []
    for result in response.results:
        captions.append(result.alternatives[0].transcript)

    return jsonify({'captions': captions})  

@app.route('/api/text', methods=['POST'])
def text_to_speech():
    if 'text' not in request.form:
        return jsonify({'error': 'No text provided'})

    text = request.form['text']

    engine = pyttsx3.init()
    engine.save_to_file(text, 'output.mp3')
    engine.runAndWait()

    return jsonify({'success': 'Text converted to speech'})
if __name__ == '__main__':
    app.run(port=8000)
