import { useEffect, useState, useMemo, useRef } from "react";

import { useUserContext } from "../utils/useUserContext";

import {
  MintNFT
} from ".";

export function Listing() {

  const inputRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const { credentials, service } = useUserContext();

  const listings = useMemo(() => {
    return posts && posts.map(post => {
      console.log(post);
      const { PostHashHex, Body, ProfileEntryResponse, ImageURLs, IsNFT} = post;
      if (!IsNFT) {
        return (
          <article key={PostHashHex}>
            <p>
              id: 
              <a 
                target="_blank"
                rel="noreferrer" 
                href={`https://explorer.deso.org/?query-node=https:%2F%2Fnode.deso.org&transaction-id=${PostHashHex}`}>
                  {PostHashHex}
                </a>
            </p>
            <div dangerouslySetInnerHTML={{__html: Body}}></div>
            <div style={{ display: "flex" }}>
              {ImageURLs && ImageURLs.map(image => {
                return (
                  <img key={PostHashHex} src={image} alt={PostHashHex} width="500"/>
                );
              })}
            </div>
            {ProfileEntryResponse && 
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <div> posted by: {ProfileEntryResponse.Username} </div>
                <div> userPublicKey: {ProfileEntryResponse.PublicKeyBase58Check}</div>
              </div>
            }
            <MintNFT NFTPostHashHex={PostHashHex}/>
            <hr/>
          </article>
        );
      }
      return null;
    });
  }, [posts]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const value = inputRef.current.value;

      // This will return the balance in “nanos,” where 1 DeSo = 1,000,000,000 “nanos.”
      const request = {
        UpdaterPublicKeyBase58Check: credentials.key,
        BodyObj: { Body: value, ImageURLs: [] },
        MinFeeRateNanosPerKB: 1500,
      };

      const response = await service.posts.submitPost(request);
      if (response?.TransactionHex) {
        alert("successfully submitted post.");
      }

      getUserListing();

    } catch(error) {
      console.log(error);
      alert(error.message);
    }
  }

  const getUserListing = async () => {
    const response = await service.posts.getPostsByPublicKey();
    setPosts(response.Posts);
  }

  // const getGlobalPosts = async () => {
  //   const response = await service.posts.getPostsStateless({});
  //   setPosts(response.PostsFound);
  // }

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
            <label>content: </label>
            <input ref={inputRef} type="text"/>
          </div>
          <div>
            <label>image: </label>
            <input ref={inputRef} type="file"/>
          </div>
        </fieldset>
        <input type="submit"/>
      </form>
      <h3>Your Listing</h3>
      {listings}
    </div>
  );
}