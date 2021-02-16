import React from "react";

export const DisplayPosts = ({ posts }) => {
  return posts.map(({ author, title }, index) => (
    <p key={index}>
      {author} - {title}
    </p>
  ));
};
