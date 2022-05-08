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

NODE_DESO = "https://node.deso.org"

# DeSo Node
NODE_LOCAL = "http://localhost:" + os.environ.get("DESO_PORT")
baseURL = NODE_DESO + "/api"

headers = {
  "Content-Type": "application/json"
}

@app.route("/")
def index():
  return "DeSo proxy backend is running."

# Great way to check if the deso-node server is working.
@app.route("/api/get-exchange-rate")
def get_exchange_rate():
  rates = requests.get(baseURL + "/v0/get-exchange-rate")
  return jsonify(rates.json())

@app.route("/api/get-single-profile", methods=["POST"])
def get_single_profile():
  body = json.dumps(request.json)
  profile = requests.post(baseURL + "/v0/get-single-profile", headers=headers, data=body)
  return jsonify(profile.json())

@app.route("/api/balance", methods=["POST"])
def get_user_balance():
  body = json.dumps(request.json)
  balance = requests.post(baseURL + "/v1/balance", headers=headers, data=body)
  return jsonify(balance.json())

@app.route("/api/update-profile", methods=["POST"])
def update_profile():
  body = json.dumps(request.json)
  profile = requests.post(baseURL + "/v0/update-profile", headers=headers, data=body)
  return jsonify(profile.json())
  
@app.route("/api/create-nft", methods=["POST"])
def create_nft():
  try:
    body = json.dumps(request.json)
    print(body)
    nft = requests.post(baseURL + "/v0/create-nft", headers=headers, data=body)
    return jsonify(nft.json())
  except requests.exceptions.RequestException as error:
    print(error)
    raise SystemExit(error)

@app.route("/api/submit-transaction", methods=["POST"])
def submit_transaction():
  body = json.dumps(request.json)
  transaction = requests.post(baseURL + "v0/submit-transaction")
  return jsonify(transaction.json())

@app.route("/api/get-txn", methods=["POST"])
def get_transaction():
  body = json.dumps(request.json)
  transaction = requests.post(baseURL + "v0/get-txn")
  return jsonify(transaction.json())

@app.route("/api/get-posts-stateless", methods=["POST"])
def get_posts_stateless():
  body = json.dumps(request.json)
  posts = requests.post(baseURL + "/v0/get-posts-stateless", headers=headers, data=body)
  return jsonify(posts.json())

@app.route("/api/get-posts-for-public-key", methods=["POST"])
def get_posts_by_public_key():
  body = json.dumps(request.json)
  posts = requests.post(baseURL + "/v0/get-posts-for-public-key", headers=headers, data=body)
  return jsonify(posts.json())

@app.route("/api/submit-post", methods=["POST"])
def submit_post():
  if request.method == "POST":
    print(request.json)
    payload = json.dumps(request.json)
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
