import { useEffect, useState, useMemo } from "react";

import { useUserContext } from "../utils/useUserContext";

export function Listing() {

  const { credentials, service } = useUserContext();
  const [posts, setPosts] = useState([]);

  const listings = useMemo(() => {
    return posts && posts.map(post => {
      const { PostHashHex, Body } = post;
      return (
        <article key={PostHashHex}>
          <p>
            id: {PostHashHex}
          </p>
          <div dangerouslySetInnerHTML={{__html: Body}}></div>
          <hr/>
        </article>
      );
    });
  }, [posts]);

  const getUserListing = async () => {
    const response = await service.posts.getPostsByPublicKey();
    setPosts(response.Posts);
  }

  useEffect(() => {
    getUserListing();
  }, []);

  return (
    <div>
      {listings}
    </div>
  );
}