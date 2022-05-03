import axios from "axios";

const Deso = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export async function submitPost(key, body) {
  const path = "/submit-post";
  const data = {
    UpdaterPublicKeyBase58Check: key,
    PostHashHexToModify: "",
    ParentStakeID: "",
    Title: "",
    BodyObj: { Body: body, ImageURLs: [] },
    RecloutedPostHashHex: "",
    PostExtraData: {},
    Sub: "",
    IsHidden: false,
    MinFeeRateNanosPerKB: 0
  }

  return await Deso.post(path, data);
}

export async function submitTransaction(signedTransactionHex) {
  if (!signedTransactionHex) {
    console.log("signedTransactionHex is required")
    return;
  }

  const path = "/v0/submit-transaction"
  const data = {
    TransactionHex : signedTransactionHex
  }

  return await Deso.post(path, data)
}