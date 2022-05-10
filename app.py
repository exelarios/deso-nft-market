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
NODE_DESO = "https://node.deso.org"

# Deso Local Node
NODE_LOCAL = "http://localhost:" + os.environ.get("DESO_PORT")
baseURL = NODE_DESO + "/api"

PRODUCTION = os.environ.get("PRODUCTION")
PORT = 8080 if PRODUCTION else 5000

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
  return jsonify(rates.json()), rates.status_code

@app.route("/api/get-single-profile", methods=["POST"])
def get_single_profile():
  try:
    body = json.dumps(request.json)
    profile = requests.post(baseURL + "/v0/get-single-profile", headers=headers, data=body)
    return jsonify(profile.json()), profile.status_code
  except requests.exceptions.RequestException as error:
    return jsonify({
      "error": "{}".format(error)
    }), profile.status_code

@app.route("/api/balance", methods=["POST"])
def get_user_balance():
  try:
    body = json.dumps(request.json)
    balance = requests.post(baseURL + "/v1/balance", headers=headers, data=body)
    return jsonify(balance.json()), balance.status_code
  except requests.exceptions.RequestException as error:
    return jsonify({
      "error": "{}".format(error)
    }), balance.status_code
  except:
    return jsonify({
      "error": "oh noes, something went extremely wrong."
    }), 503

@app.route("/api/update-profile", methods=["POST"])
def update_profile():
  try:
    body = json.dumps(request.json)
    profile = requests.post(baseURL + "/v0/update-profile", headers=headers, data=body)
    return jsonify(profile.json()), profile.status_code
  except requests.exceptions.RequestException as error:
    return jsonify({
      "error": "{}".format(error)
    }), profile.status_code
  except:
    return jsonify({
      "error": "oh noes, something went extremely wrong."
    }), 503
  
@app.route("/api/create-nft", methods=["POST"])
def create_nft():
  try:
    body = json.dumps(request.json)
    nft = requests.post(baseURL + "/v0/create-nft", headers=headers, data=body)
    return jsonify(nft.json()), nft.status_code
  except requests.exceptions.RequestException as error:
    return jsonify({
      "error": "{}".format(error)
    }), nft.status_code
  except:
    return jsonify({
      "error": "oh noes, something went extremely wrong."
    }), 503

@app.route("/api/submit-transaction", methods=["POST"])
def submit_transaction():
  try:
    body = json.dumps(request.json)
    transaction = requests.post(baseURL + "/v0/submit-transaction", headers=headers, data=body)
    return jsonify(transaction.json()), transaction.status_code
  except requests.exceptions.RequestException as error:
    return jsonify({
      "error": "{}".format(error)
    }), transaction.status_code
  except:
    return jsonify({
      "error": "oh noes, something went extremely wrong."
    }), 503

@app.route("/api/get-txn", methods=["POST"])
def get_transaction():
  try:
    body = json.dumps(request.json)
    transaction = requests.post(baseURL + "/v0/get-txn", headers=headers, data=body)
    return jsonify(transaction.json()), transaction.status_code
  except requests.exceptions.RequestException as error:
    return jsonify({
      "error": "{}".format(error)
    }), transaction.status_code
  except:
    return jsonify({
      "error": "oh noes, something went extremely wrong."
    }), 503

@app.route("/api/get-posts-stateless", methods=["POST"])
def get_posts_stateless():
  try:
    body = json.dumps(request.json)
    posts = requests.post(baseURL + "/v0/get-posts-stateless", headers=headers, data=body)
    return jsonify(posts.json()), posts.status_code
  except requests.exceptions.RequestException as error:
    return jsonify({
      "error": "{}".format(error)
    }), posts.status_code
  except:
    return jsonify({
      "error": "oh noes, something went extremely wrong."
    }), 503

@app.route("/api/get-posts-for-public-key", methods=["POST"])
def get_posts_by_public_key():
  try:
    body = json.dumps(request.json)
    posts = requests.post(baseURL + "/v0/get-posts-for-public-key", headers=headers, data=body)
    return jsonify(posts.json()), posts.status_code
  except requests.exceptions.RequestException as error:
    return jsonify({
      "error": "{}".format(error)
    }), posts.status_code
  except:
    return jsonify({
      "error": "oh noes, something went extremely wrong."
    }), 503

@app.route("/api/get-nfts-for-user", methods=["POST"])
def get_nfts_for_user():
  try:
    body = json.dumps(request.json)
    nfts = requests.post(baseURL + "/v0/get-nfts-for-user", headers=headers, data=body)
    return jsonify(nfts.json()), nfts.status_code
  except requests.exceptions.RequestException as error:
    return jsonify({
      "error": "{}".format(error)
    }), nfts.status_code
  except:
    return jsonify({
      "error": "oh noes, something went extremely wrong."
    }), 503

@app.route("/api/submit-post", methods=["POST"])
def submit_post():
  try:
    payload = json.dumps(request.json)
    post = requests.post(baseURL + "/v0/submit-post", headers=headers ,data=payload)
    return jsonify(post.json()), post.status_code
  except requests.exceptions.RequestException as error:
    return jsonify({
      "error": "{}".format(error)
    }), post.status_code
  except:
    return jsonify({
      "error": "oh noes, something went extremely wrong."
    }), 503

# Not a real endpoint, just for testing mongodb.
@app.route("/nft", methods=["GET"])
def nft():
  cursor = nfts.find({})
  list_cursor = list(cursor)
  json_data = dumps(list_cursor)

  return jsonify({
    "success": True,
    "nfts": json.loads(json_data)
  })

if __name__ == "__main__":
  app.run(debug = PRODUCTION, threaded=True)
