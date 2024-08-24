from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import random
import requests

# https://archive.org/download/winampskin_Abandoned_Pools_Robot/Abandoned_Pools_-_Robot.wsz

def get(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as http_err:
        return False
    except Exception as err:
        return False
    

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/randomSkin')
def randomSkin():
    identifier = ''
    with open('out.txt', 'r') as file:
        file.seek(random.randint(0, file.seek(0, 2)))
        file.readline()
        return {'skin': file.readline()}

@app.route('/test', methods=['POST'])
def post_data():
    data = request.json  # Get JSON data from the request
    return jsonify(data)  # Echo the received data back


if __name__ == '__main__':
    app.run(port=5000)



