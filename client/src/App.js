import { useEffect, useMemo, useState } from "react";

import { UserContext } from "./utils/useUserContext";

import { 
  Listing,
  UpdateProfile
} from "./components";

import protocol from "./utils/api/deso";

function App() {

  const [auth, setAuth] = useState({});
  const [service, setService] = useState(null);
  const [nanoBalance, setNanoBalance] = useState({});
  const [profile, setProfile] = useState({});
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const handleLogin = async () => {
    const data = await service.identity.login("4");
    setAuth(data);
  }

  const handleLogout = async () => {
    await service.identity.logout(auth.key);
    setAuth({});
  }

  const getUserProfile = async () => {
    const request = {
      "PublicKeyBase58Check": auth.key
    };
    const response = await protocol.user.getSingleProfile(request);
    setProfile(response.Profile);
  }

  const getNanoBalance = async () => {
    try {
      const response = await protocol.user.getBalance();
      setNanoBalance(response);
    } catch(error) {
      console.log(error);
    }
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

  useEffect(() => {
    getNanoBalance();
    getUserProfile();
  }, [auth])

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
              {profile ?
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                  username: {profile.Username} <br/>
                  description: {profile.Description}
                </div>
                :
                <div>
                  couldn't find profile
                </div>
              }
              <div>network: {auth.user.network}</div>
              <div>nanos: {nanoBalance.ConfirmedBalanceNanos}</div>
              <div>pending_nanos: {nanoBalance.UnconfirmedBalanceNanos}</div>
              <button onClick={handleLogout}>logout</button>
              <button 
                onClick={() => {setProfileModalOpen(!isProfileModalOpen)}}>
                {isProfileModalOpen ? "close edit profile" : "edit profile"}
              </button>
              {isProfileModalOpen &&
                <UpdateProfile/>
              }
              <hr />
              <Listing/>
            </div>
            :
            <div>
              <button onClick={handleLogin}>login</button>
            </div>
          }
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>built by team 8</div>
    </UserContext.Provider>
  );
}

export default App;