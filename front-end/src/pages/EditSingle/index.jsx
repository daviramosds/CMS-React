import React, { useState, useEffect } from "react";
import Header from "../../components/Header";

import Noty from "noty";
import "../../../node_modules/noty/lib/noty.css";
import "../../../node_modules/noty/lib/themes/mint.css";

import Swal from "sweetalert2";

// CommonJS
import "./styles.css";

import api from "../../services/api";

function EditSingle(props) {
  const id = props.match.params.id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    async function getPost() {
      const { data } = await api.get(`posts/${id}`);
      setTitle(data["title"]);
      setContent(data["content"]);
      setCategory(data["category"]);
      setImage(data["image"]);
    }

    getPost();
  }, []);

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

  function handleRemovePost() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef5350",
      cancelButtonColor: "#19191C",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`posts/${id}`);
        new Noty({
          text: "Post deleted",
          type: "success",
          timeout: 3000,
        }).show();
      }
    });
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
        .put(`posts/${id}`, {
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
      <Header subtitle={title} page="EditSingle" />
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
            <div className="remove" onClick={handleRemovePost}>
              Remove
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditSingle;
