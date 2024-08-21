from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# Configure CORS with specific options
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def home():
    return jsonify('Hello, Flask with CORS!')

@app.route('/test', methods=['POST'])
def post_data():
    data = request.json  # Get JSON data from the request
    return jsonify(data)  # Echo the received data back


if __name__ == '__main__':
    app.run()
