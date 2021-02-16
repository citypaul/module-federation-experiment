const bc = new BroadcastChannel("test_channel");

export const getPosts = (onUpdateCallback) => {
  const fetchPosts = () =>
    fetch("http://localhost:3000/posts").then((response) => response.json());

  bc.onmessage = (ev) => {
    fetchPosts();
  };

  return {
    onPostsUpdate: () => {},
    fetchPosts,
  };
};

export const createPost = ({ author, title }) => {
  // Default options are marked with *
  return fetch("http://localhost:3000/posts", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ title, author }), // body data type must match "Content-Type" header
  }).then((res) => {
    console.log("did create post!");
    bc.postMessage({ author, title });
    return res;
  });
};
