import { useEffect, useMemo, useState } from "react";
import { useUserContext } from "../utils/useUserContext";

export function NFTListing() {

  const { credentials, service } = useUserContext();
  const [nfts, setNfts] = useState({});

  const listing = useMemo(() => {
    return Object.keys(nfts).map(key => {
      const { NFTEntryResponses, PostEntryResponse} = nfts[key];
      const { PostHashHex, Body, ImageURLs, ProfileEntryResponse } = PostEntryResponse;
      return NFTEntryResponses.map(listing => {
        const { SerialNumber } = listing;
        return (
          <article key={`${key}#${SerialNumber}`}>
            <div>id: {key}</div>
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
            <hr/>
          </article>
        );
      })
    });
  }, [nfts]);

  const getUsersNFTListing = async () => {
    const request = {
      "UserPublicKeyBase58Check": credentials.key
    };
    const response = await service.nft.getNftsForUser(request);
    setNfts(response.data?.NFTsMap)
  }

  useEffect(() => {
    getUsersNFTListing();
  }, []);

  return (
    <div>
      <h3>Your NFT Listing</h3>
      {listing}
    </div>
  );
}