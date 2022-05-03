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

# DeSo Node
deso_node_URL = "http://localhost:" + os.environ.get("DESO_PORT")
baseURL = deso_node_URL + "/api/v0"
# http://localhost:18001/api/v0/

@app.route("/")
def index():
  return "DeSo proxy backend is running."

# Great way to check if the deso-node server is working.
@app.route("/api/get-exchange-rate")
def get_exchange_rate():
  rates = requests.get(baseURL + "/get-exchange-rate")
  return jsonify(rates.json())

@app.route("/api/get-single-profile", methods=["POST"])
def get_single_profile():
  profile = requests.get(baseURL + "/get-single-profile")
  print(profile)
  return jsonify(profile.json())

@app.route("/api/submit-post", methods=["POST"])
def submit_post():
  if request.method == "POST":
    print(request.json)
    payload = json.dumps(request.json)
    headers = {
      "Content-Type": "application/json"
    }
    post = requests.post("http://localhost:18001/api/v0/submit-post", headers=headers ,data=payload)
    print(post.json())
    return jsonify(post.json())

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