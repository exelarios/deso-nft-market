import { useRef } from "react";
import { useUserContext } from "../utils/useUserContext";

export function UpdateProfile() {

  const { credentials, service } = useUserContext();
  const form = useRef({
    NewUsername: "",
    NewDescription: ""
  });

  const onUpdateProfile = async (event) => {
    event.preventDefault();
    if (form.current.NewUsername.length <= 0 
      && form.current.NewDescription.length <= 0) {
        alert("form can't be empty.");
        return;
    }

    const payload = {
      "UpdaterPublicKeyBase58Check": credentials.key,
      "MinFeeRateNanosPerKB": 10000,
      "NewUsername": form.current.NewUsername,
      "NewDescription": form.current.NewDescription,
      "NewStakeMultipleBasisPoints": 12500
    }

    try {
      const response = await service.social.updateProfile(payload);
      console.log(response);
      alert("sucessfully updated profile");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  const handleForm = (event) => {
    const target = event.target.value;
    const name = event.target.name;
    form.current = {
      ...form.current,
      [name]: target
    };
  }

  return (
    <div>
      <form onSubmit={onUpdateProfile}>
        <fieldset>
          <legend>update profile</legend>
          <div>
            <label>new username: </label>
            <input name="NewUsername" type="text" onChange={handleForm}/>
          </div> 
          <div>
            <label>new description: </label>
            <input name="NewDescription" type="text" onChange={handleForm}/>
          </div>
          <input type="submit"/>
        </fieldset>
      </form>
    </div>
  );
}