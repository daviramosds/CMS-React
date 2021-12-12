import React from "react";

import "./styles.css";

function EditPost({ title, image, category, content }) {
  return (
    <div style={{ backgroundImage: `url(${image})` }} className="post">
      <div className="post-wraper">
        <h1>{title}</h1>

        <p>{content}</p>

        <h3>{category}</h3>
      </div>
    </div>
  );
}

export default EditPost;
