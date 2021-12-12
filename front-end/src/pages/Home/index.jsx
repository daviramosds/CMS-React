import React, { useContext, useState, useEffect } from "react";
import Header from "../../components/Header";
import EditPost from "../../components/EditPost";

import { Context } from "../../Store";

import { Link } from "react-router-dom";

import "./styles.css";

import api from "../../services/api";

function Home() {
  const [searchContent, setSearchContent] = useContext(Context);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const { data } = await api.get("posts");
      setPosts(data);
    }

    getPosts();
  }, []);

  var ammount = 0;
  var maxAmmount = posts.length;

  return (
    <>
      <Header page="Home" />
      <div className="posts">
        {posts.map((item) => {
          if (searchContent === "") {
            return (
              <Link className="Link" to={`edit/${item.id}`}>
                <EditPost
                  category={item.category}
                  title={item.title}
                  content={item.content}
                  image={item.image}
                  key={item.title}
                />
              </Link>
            );
          } else {
            var string = "";

            for (const [p, val] of Object.entries(item)) {
              string += `${val}\n`;
            }

            if (string.includes(searchContent)) {
              return (
                <Link className="Link" to={`edit/${item.id}`}>
                  <EditPost
                    category={item.category}
                    title={item.title}
                    content={item.content}
                    image={item.image}
                  />
                </Link>
              );
            } else {
              ammount += 1;
              if (ammount === maxAmmount) {
                return <p>Nenhum post</p>;
              }
            }
          }
        })}
      </div>
    </>
  );
}

export default Home;
