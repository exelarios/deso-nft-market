import { useRef } from "react";
import { useUserContext } from "../utils/useUserContext";

export function ListingForm(props) {
  const { credentials, service } = useUserContext()
  const inputRef = useRef(null);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const value = inputRef.current.value;
      console.log(value);

      // This will return the balance in “nanos,” where 1 DeSo = 1,000,000,000 “nanos.”
      const request = {
        UpdaterPublicKeyBase58Check: credentials.key,
        BodyObj: { Body: value, ImageURLs: [] },
        MinFeeRateNanosPerKB: 50,
      };

      const response = await service.posts.submitPost(request);
      if (response?.TransactionHex) {
        alert("successfully submitted post.");
      }
    } catch(error) {
      console.error(error);
      alert(error.message);
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