import { BroadcastChannel } from "broadcast-channel";
const bc = new BroadcastChannel("test_channel", {
  webWorkerSupport: false,
});

const keys = {
  allPosts: "allPosts",
};

const cache = () => {
  const cacheStore = {};

  const set = (key, value) => {
    cacheStore[key] = value;
  };

  const get = (key) => {
    return cacheStore[key];
  };

  const reset = (key) => {
    delete cacheStore[key];
  };

  return { get, set, reset };
};

const apiCache = cache();

const createBroadcastChannelData = ({ key }) => ({ key });

export const getPosts = ({ onGlobalUpdate } = {}) => {
  bc.onmessage = (data) => {
    if (data.key === keys.allPosts) {
      onGlobalUpdate();
    }
  };

  const fetchPosts = () => {
    const cache = apiCache.get("allPosts");

    if (cache) {
      console.log("returning: ", cache);
      return Promise.resolve(cache);
    }

    return fetch("http://localhost:3000/posts").then((response) => {
      const jsonResponse = response.json();

      apiCache.set("allPosts", jsonResponse);
      return jsonResponse;
    });
  };

  return {
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
    apiCache.reset("allPosts");
    bc.postMessage(createBroadcastChannelData({ key: keys.allPosts }));

    return res;
  });
};
