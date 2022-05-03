import { useRef } from "react";
import { useUserContext } from "../utils/useUserContext";

import { submitPost } from "../utils/api/deso";

export function ListingForm(props) {

  const { credentials, deso } = useUserContext()
  const inputRef = useRef(null);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const value = inputRef.current.value;
      console.log(value);

      // console.log(await deso.user.getSingleProfile({
      //   "PublicKeyBase58Check": credentials.key
      // }))

      const request = {
        UpdaterPublicKeyBase58Check: credentials.key,
        BodyObj: { Body: value, ImageURLs: [] },
        MinFeeRateNanosPerKB: 1
      };

      const response = await submitPost(credentials.key, value);
      console.log(response.data);

      // if (response.status != "OK")
      //   throw new Error("Failed to get a stable response.");

      // const hex = response.data.TransactionHex;
      // console.log("TransactionHex:", hex);
      // if (response?.data) {
      //   const signedHex = identity.signTransaction(hex);
      //   console.log(signedHex);
      //   // const sendPost = await submitTransaction(signedHex);
      //   // console.log(sendPost.data);
      // }

    } catch(error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <fieldset>
        <legend>Create listing</legend>
        <div>
          <label>content:</label>
          <input ref={inputRef} type="text"/>
        </div>
      </fieldset>
      <input type="submit"/>
    </form>
  );
}