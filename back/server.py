from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import random
import requests
import json
from searchArchives import searchIA
from pyradios import RadioBrowser
import random

SKINS = 53060
rb = RadioBrowser()


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


@app.route("/randomSkin")
def randomSkin():
    n = random.randint(0, SKINS - 1)
    with open(f"./fin/{n}.json", "r") as file:
        jso = json.loads(file.read())
        return jso


@app.route("/randomSkins")
def randomSkins():
    n = random.randint(0, SKINS - 11)
    fin = []
    for i in range(10):
        with open(f"./fin/{n+i}.json", "r") as file:
            jso = json.loads(file.read())
            jso["images"] = [i for i in jso["images"] if 'thumb' in i]
            fin.append(jso)
    return {"skins": fin}


@app.route("/searchIA", methods=["POST"])
def searchIArout():
    data = request.json
    return jsonify(searchIA(data))


@app.route("/searchRadioByTag", methods=["POST"])
def searchRadioByTag():
    data = request.json
    stations = rb.search(name=data["searchTerm"])
    stations = [
        {
            "name": i["name"],
            "url": i["url_resolved"],
            "duration": 0,
            "metaData": {
                "artist": i["name"],
                "title": i["country"],
            },
        }
        for i in stations
    ]
    return {"traks": stations}


@app.route("/test", methods=["POST"])
def post_data():
    data = request.json
    return jsonify(data)


if __name__ == "__main__":
    app.run(port=5000)
