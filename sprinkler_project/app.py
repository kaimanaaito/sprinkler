from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Variable to hold the sprinkler status
sprinkler_status = {'is_on': False}

# API key and base URL for weather information
API_KEY = '4767e5479e31dabd5c89c86838ccfefd'
BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

@app.route('/weather/<city>', methods=['GET'])
def get_weather(city):
    response = requests.get(f'{BASE_URL}?q={city}&appid={API_KEY}&units=metric')
    data = response.json()
    
    if data['cod'] == 200:
        weather = {
            'main': data['weather'][0]['main'],
            'description': data['weather'][0]['description'],
            'temp': data['main']['temp'],
            'humidity': data['main']['humidity'],
        }
        return jsonify(weather)
    else:
        return jsonify({'error': 'City not found'}), 404

@app.route('/toggle_sprinkler', methods=['POST'])
def toggle_sprinkler():
    global sprinkler_status
    sprinkler_status['is_on'] = request.json['is_on']  # Use value sent from the frontend
    return jsonify(sprinkler_status)

if __name__ == '__main__':
    app.run(debug=True)