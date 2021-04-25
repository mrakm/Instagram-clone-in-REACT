import React from "react";
import { Avatar } from "@material-ui/core";
//by mrakm
import "./Post.css";

const Post = ({ data }) => {
  return (
    <div className="post">
      {/* Header -> Avtar + NAme */}
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="Image"
          src="/static/images/avatar/1.jpg"
        />
        <h1>{data.username}</h1>
      </div>
      {/* Image */}
      <img className="post__image" src={data.imageUrl} alt="Image" />
      {/* Username + Caption */}
      <h4 className="post__text">
        <strong>Username:</strong> {data.caption}
      </h4>
    </div>
  );
};

export default Post;
