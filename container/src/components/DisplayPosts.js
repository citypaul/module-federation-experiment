import React, { useState, useEffect } from "react";
import { getPosts } from "../../../shared-lib/getPosts";
import { httpClient } from "../../../shared-lib/dist/index";

export const DisplayPosts = () => {
  const [httpLibPosts, setHttpLibPosts] = useState([]);
  // const { hopinHttp } = initHopinHttp({
  //   method: "get",
  //   url: "http://localhost:3000/posts",
  // });

  useEffect(() => {
    const run = async () => {
      // if (!isUpdating) {
      const result = await httpClient.get("http://localhost:3000/posts");
      setHttpLibPosts(result.data);
      // }
    };

    run();
  }, []);

  const handleGetClick = async () => {
    console.log("runs");
    const result = await httpClient.get("http://localhost:3000/posts", {});

    setHttpLibPosts(result.data);
  };

  const handlePutClick = async () => {
    const result = await httpClient.put("http://localhost:3000/posts/1", {
      author: "smeg",
    });
  };

  const handlePostClick = async () => {
    const result = await httpClient.post("http://localhost:3000/posts", {
      author: "Paul",
      title: "Web developer",
    });
  };
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

  const posts = httpLibPosts.map(({ author, title }, index) => (
    <p key={index}>
      {author} - {title}
    </p>
  ));

  return (
    <>
      <button onClick={handleGetClick}>Make GET request</button>
      <button onClick={handlePutClick}>Make PUT request</button>
      <button onClick={handlePostClick}>Make POST request</button>
      {posts}
    </>
  );
};
