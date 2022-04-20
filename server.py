import os
import json
import requests
from bson.json_util import dumps
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)
client = MongoClient(os.environ.get("MOGNODB_URI"))
db = client["deso-v0"]
app.config['CORS_HEADERS'] = 'Content-Type'

nfts = db["nfts"]

baseURL = "http://localhost:18001/api/v0"

@app.route("/")
def index():
  return "DeSo backend is running."

# Great way to check if the deso-node server is working.
@app.route("/api/get-exchange-rate")
def get_exchange_rate():
  rates = requests.get(baseURL + "/get-exchange-rate")
  return jsonify(rates.json())

@app.route("/api/submit-post", methods=["POST"])
def submit_post():
  if request.method == "POST":
    print(request.json)
    return jsonify({
      "success": True
    })

@app.route("/nft", methods=["GET"])
def nft():

  cursor = nfts.find({})
  list_cursor = list(cursor)
  json_data = dumps(list_cursor)

  return jsonify({
    "success": True,
    "nfts": json.loads(json_data)
  })

app.run(debug = True, threaded=True)