import { useEffect, useMemo, useState } from "react";

import { UserContext } from "./utils/useUserContext";
import { ListingForm } from "./components";

import Deso from "deso-protocol";

// I had to look into the source code to find ways to configure the library to take in a custom URI and network.
// https://github.com/deso-protocol/deso-workspace/blob/master/libs/deso-protocol/src/index.ts
const deso = new Deso("http://localhost:18001/api/v0");
deso.node.setUri("http://localhost:18001/api/v0");
deso.identity.network = "testnet";

function App() {

  const [auth, setAuth] = useState({});

  const handleLogin = async () => {
    const data = await deso.identity.login("4");
    console.log(data);
    setAuth(data);
  }

  const handleLogout = async () => {
    await deso.identity.logout(auth.key);
    setAuth({});
  }

  useEffect(() => {
    const login_key = localStorage.getItem("login_key");
    const login_user = localStorage.getItem("login_user");

    if (login_key && login_user) {
      setAuth({
        key: login_key,
        user: JSON.parse(login_user)
      });
    }
  }, []);

  const value = useMemo(() => {
    return {
      deso,
      credentials: auth
    };
  }, [auth]);

  return (
    <UserContext.Provider value={value}>
      <div className="App">
        <h1>deso nuts</h1>
        <p>
          college skids: web3 go brrrrrrrrrrr
        </p>
        <div>
          {auth?.key ?
            <div>
              <div>{auth.key}</div>
              <div>network: {auth.user.network}</div>
              <button onClick={handleLogout}>logout</button>
              <hr />
              <ListingForm/>
            </div>
            :
            <div>
              <button onClick={handleLogin}>login</button>
            </div>
          }
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;