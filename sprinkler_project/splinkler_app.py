from flask import Flask, jsonify, request, render_template
import requests

app = Flask(__name__)

# OpenWeatherMapのAPIキーを設定
API_KEY = 'ed3253d5484b6cecdff74814420d5093'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/weather/<city>', methods=['GET'])
def get_weather(city):
    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric'
    response = requests.get(url)
    data = response.json()

    if response.status_code != 200:
        return jsonify({'error': 'City not found or an error occurred.'})

    weather_description = data['weather'][0]['description']
    return jsonify({'description': weather_description})

@app.route('/toggle_sprinkler', methods=['POST'])
def toggle_sprinkler():
    data = request.json
    sprinkler_status = data.get('is_on', False)
    return jsonify({'status': 'on' if sprinkler_status else 'off'})

if __name__ == '__main__':
    app.run(debug=True)
