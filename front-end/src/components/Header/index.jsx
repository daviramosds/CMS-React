import React, { useContext, useState, useEffect } from "react";
import Search from "../Search";
import { Context } from "../../Store";

import api from "../../services/api";

import { Link } from "react-router-dom";

import "./styles.css";

function Header({ page, subtitle = "" }) {
  const [searchContent, setSearchContent] = useContext(Context);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      var cat = [];
      const { data } = await api.get("posts");
      data.map((post) => {
        if (cat.includes(post["category"]) === false) {
          cat.push(post["category"]);
          setCategories(cat);
        }

        return false;
      });
    }

    getCategories();
  }, []);

  function handleChangeSearch(event) {
    setSearchContent(event.target.innerText);
  }

  return (
    page === "Home" 
    ? <header>
        <div className="title">
          <Link to="/new" className="Link">
            <button>+</button>
          </Link>
        </div>

        <Search />

        <div className="categories">
          {categories.map((item) => {
            return <span onClick={handleChangeSearch}>{item}</span>;
          })}
        </div>
      </header>
    
    : <header>
        <div className="title">
          <Link to="/" className="Link">
            <button>{"<"}</button>
          </Link>
        </div>

        <div className="subtitle">
          <span>{subtitle}</span>
        </div>
      </header>
  )
}

export default Header;
