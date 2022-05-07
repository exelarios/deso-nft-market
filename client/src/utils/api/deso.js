import axios from "axios";
import DesoService from "deso-protocol";

const Deso = axios.create({
  baseURL: process.env.REACT_APP_DESO_NODE,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// I had to look into the source code to find ways to configure the library to take in a custom URI and network.
// https://github.com/deso-protocol/deso-workspace/blob/master/libs/deso-protocol/src/index.ts
const protocol = new DesoService(process.env.REACT_APP_DESO_NODE + "/v0");
protocol.node.setUri(process.env.REACT_APP_DESO_NODE + "/v0");
protocol.identity.network = process.env.REACT_APP_NETWORK;

protocol.posts.getPostsByPublicKey = async () => {
  const publicKey = localStorage.getItem("login_key");
  if (!publicKey)
    throw new Error("Fail fetch public key through LocalStorage.");

  console.log(publicKey);
  
  const path = "v0/get-posts-for-public-key";
  const body = {
    "PublicKeyBase58Check": publicKey,
    "NumToFetch": 100,
  };

  const response = await Deso.post(path, body);
  console.log(response.data);
  return response.data;
}

protocol.social.updateProfile = async (request) => {
  const updateProfileResponse = await Deso.post("/v0/update-profile", request);
  const data = updateProfileResponse.data;
  const transactionHex = data.TransactionHex;
  if (transactionHex) {
    console.log('hi');
    const transactionResponse = await protocol.identity.submitTransaction(transactionHex);
    console.log(transactionResponse);
  }
}

protocol.user.getBalance = async () => {
  const publicKey = localStorage.getItem("login_key");
  if (!publicKey)
    throw new Error("Fail fetch public key through LocalStorage.");

  const body = {
    "PublicKeyBase58Check": publicKey
  }

  const response = await Deso.post("/v1/balance", body);
  return response.data;
}

export default protocol;