import React from "react";

export const DisplayPosts = ({ posts, header }) => {
  const postsBlock = posts.map(({ author, title }, index) => (
    <p key={index}>
      {author} - {title}
    </p>
  ));

  return (
    <>
      <h3>{header}</h3>
      {postsBlock}
    </>
  );
};
