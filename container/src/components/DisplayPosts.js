import React, { useState } from "react";
import { getPosts } from "../../../shared-lib/getPosts";

export const DisplayPosts = ({ forceUpdate }) => {
  const [posts, setPosts] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const { fetchPosts } = getPosts({
    onGlobalUpdate: () => {
      setIsUpdating(true);
    },
  });

  React.useEffect(() => {
    const get = async () => {
      if (!isUpdating) {
        const res = await fetchPosts();
        setPosts(res);
      }

      setIsUpdating(false);
    };

    get();
  }, [isUpdating, forceUpdate]);

  return posts.map(({ author, title }, index) => (
    <p key={index}>
      {author} - {title}
    </p>
  ));
};
