import { useEffect, useMemo, useState } from "react";

import { UserContext } from "./utils/useUserContext";

import { 
  Listing, 
  ListingForm 
} from "./components";

import protocol from "./utils/api/deso";

function App() {

  const [auth, setAuth] = useState({});
  const [service, setService] = useState(null);

  const handleLogin = async () => {
    const data = await service.identity.login("4");
    console.log(data);
    setAuth(data);
  }

  const handleLogout = async () => {
    await service.identity.logout(auth.key);
    setAuth({});
  }

  useEffect(() => {

    setService(protocol);

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
      service,
      credentials: auth
    };
  }, [service, auth]);

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
              <Listing/>
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