import axios from "axios";
import DesoService from "deso-protocol";

// const DESO_NODE = "https://dezos-nuts.herokuapp.com/api";
const DESO_NODE = "http://127.0.0.1:5000/api";
const DESO_NETWORK= "mainnet";

const Deso = axios.create({
  baseURL: DESO_NODE,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// I had to look into the source code to find ways to configure the library to take in a custom URI and network.
// https://github.com/deso-protocol/deso-workspace/blob/master/libs/deso-protocol/src/index.ts
// const protocol = new DesoService(DESO_NODE + "/v0");
// protocol.node.setUri(DESO_NODE + "/v0");
const protocol = new DesoService(DESO_NODE);
protocol.node.setUri(DESO_NODE);
protocol.identity.network = DESO_NETWORK;

protocol.posts.getPostsByPublicKey = async () => {
  const publicKey = localStorage.getItem("login_key");
  if (!publicKey)
    throw new Error("Failed fetch public key through LocalStorage.");

  const path = "/get-posts-for-public-key";
  const body = {
    "PublicKeyBase58Check": publicKey,
    "NumToFetch": 100,
  };

  const response = await Deso.post(path, body);
  return response.data;
}

protocol.social.updateProfile = async (request) => {
  // const updateProfileResponse = await Deso.post("/v0/update-profile", request);
  const updateProfileResponse = await Deso.post("/update-profile", request);
  const data = updateProfileResponse.data;
  const transactionHex = data.TransactionHex;
  if (transactionHex) {
    const transactionResponse = await protocol.identity.submitTransaction(transactionHex);
    return transactionResponse;
  }
}

protocol.user.getBalance = async () => {
  const publicKey = localStorage.getItem("login_key");
  if (!publicKey)
    throw new Error("Fail fetch public key through LocalStorage.");

  const body = {
    "PublicKeyBase58Check": publicKey
  }

  // const response = await Deso.post("/v1/balance", body);
  const response = await Deso.post("/balance", body);
  return response.data;
}

export default protocol;