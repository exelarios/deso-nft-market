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
const protocol = new DesoService(process.env.REACT_APP_DESO_NODE);
protocol.node.setUri(process.env.REACT_APP_DESO_NODE);
protocol.identity.network = process.env.REACT_APP_NETWORK;

protocol.posts.getPostsByPublicKey = async () => {
  const publicKey = localStorage.getItem("login_key");
  if (!publicKey)
    throw new Error("Fail fetch public key through LocalStorage.");

  console.log(publicKey);
  
  const path = "/get-posts-for-public-key";
  const body = {
    "PublicKeyBase58Check": publicKey
  };

  const response = await Deso.post(path, body);
  return await response.data;
}

export default protocol;