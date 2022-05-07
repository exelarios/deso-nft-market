import { useEffect, useState, useMemo, useRef } from "react";

import { useUserContext } from "../utils/useUserContext";

export function Listing() {

  const inputRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const { credentials, service } = useUserContext();

  const listings = useMemo(() => {
    return posts && posts.map(post => {
      const { PostHashHex, Body, ProfileEntryResponse} = post;
      return (
        <article key={PostHashHex}>
          <p>
            id: {PostHashHex}
          </p>
          <div dangerouslySetInnerHTML={{__html: Body}}></div>
          {ProfileEntryResponse && 
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <div> posted by: {ProfileEntryResponse.Username} </div>
              <div> userPublicKey: {ProfileEntryResponse.PublicKeyBase58Check}</div>
            </div>
          }
          <hr/>
        </article>
      );
    });
  }, [posts]);

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

  const getUserListing = async () => {
    const response = await service.posts.getPostsByPublicKey();
    setPosts(response.Posts);
  }

  const getGlobalPosts = async () => {
    const response = await service.posts.getPostsStateless({});
    setPosts(response.PostsFound);
  }

  useEffect(() => {
    getUserListing();
    // getGlobalPosts();
  }, []);

  return (
    <div>
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
      <h3>listing</h3>
      {listings}
    </div>
  );
}