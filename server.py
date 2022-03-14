import os
import json
from bson.json_util import dumps
from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
client = MongoClient(os.environ.get("MOGNODB_URI"))
db = client["deso-v0"]

nfts = db["nfts"]

@app.route("/")
def index():
  return "DeSo backend is running."

@app.route("/nft", methods=["GET"])
def nft():

  cursor = nfts.find({})
  list_cursor = list(cursor)
  json_data = dumps(list_cursor)

  return jsonify({
    "success": True,
    "nfts": json.loads(json_data)
  })

app.run(debug = True)