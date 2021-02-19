import React, { useState, useEffect } from "react";
import { getPosts } from "../../../shared-lib/getPosts";
import { initHopinHttp } from "../../../shared-lib/axios";

export const DisplayPosts = () => {
  const [httpLibPosts, setHttpLibPosts] = useState([]);
  const { hopinHttp } = initHopinHttp({
    method: "get",
    url: "http://localhost:3000/posts",
  });

  useEffect(() => {
    const run = async () => {
      // if (!isUpdating) {
      const result = await hopinHttp.get("http://localhost:3000/posts");

      setHttpLibPosts(result.data);
      // }
    };

    run();
  }, []);

  // const [posts, setPosts] = useState([]);
  // const [isUpdating, setIsUpdating] = useState(false);

  // const { fetchPosts } = getPosts({
  //   onGlobalUpdate: () => {
  //     setIsUpdating(true);
  //   },
  // });

  // React.useEffect(() => {
  //   const get = async () => {
  //     if (!isUpdating) {
  //       const res = await fetchPosts();
  //       setPosts(res);
  //     }

  //     setIsUpdating(false);
  //   };

  //   get();
  // }, [isUpdating, forceUpdate]);

  return httpLibPosts.map(({ author, title }, index) => (
    <p key={index}>
      {author} - {title}
    </p>
  ));
};
