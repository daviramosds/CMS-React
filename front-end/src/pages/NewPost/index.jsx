import React, { useState } from "react";
import Header from "../../components/Header";

import { Link } from "react-router-dom";

import Noty from "noty";
import "../../../node_modules/noty/lib/noty.css";
import "../../../node_modules/noty/lib/themes/mint.css";

import "./styles.css";

import api from "../../services/api";

function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  function handleChangeTitle(event) {
    setTitle(event.target.value);
  }

  function handleChangeCategory(event) {
    setCategory(event.target.value);
  }

  function handleChangeContent(event) {
    setContent(event.target.value);
  }

  function handleChangeImage(event) {
    setImage(event.target.value);
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    if (title === "" || category === "" || content === "") {
      new Noty({
        text: "Empty data is not allowed",
        type: "error",
        timeout: 3000,
      }).show();
    } else {
      api
        .post(`posts/`, {
          title: title,
          category: category,
          content: content,
          image: image,
        })
        .then((resp) => {
          new Noty({
            text: "Done",
            type: "success",
            timeout: 3000,
          }).show();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <>
      <Header subtitle={title} page="editSingle" />
      <div className="posts">
        <form onSubmit={handleSubmitForm}>
          <input
            type="text"
            placeholder="Title"
            onChange={handleChangeTitle}
            value={title}
          />
          <input
            type="text"
            placeholder="Category"
            onChange={handleChangeCategory}
            value={category}
          />
          <input
            type="text"
            placeholder="Image url"
            onChange={handleChangeImage}
            value={image}
          />
          <textarea
            onChange={handleChangeContent}
            placeholder="Content"
            value={content}
          ></textarea>
          <div className="double">
            <input type="submit" value="Save" />
            <Link to="/" className="Link remove">
              <div>Cancel</div>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewPost;
