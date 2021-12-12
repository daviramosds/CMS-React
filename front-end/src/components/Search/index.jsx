import React, { useContext } from "react";

import "./styles.css";
import SearchOutlined from "@material-ui/icons/SearchOutlined";

import { Context } from "../../Store";

function Search() {
  const [searchContent, setSearchContent] = useContext(Context);

  function handleSearch(event) {
    setSearchContent(event.target.value);
  }

  return (
    <div className="searchBox">
      <input
        className={
          searchContent === "" ? "searchInput" : "searchInput searchFilled"
        }
        type="text"
        value={searchContent}
        id="searchInput"
        placeholder="Search"
        onChange={handleSearch}
      />
      <button className="searchButton" id="searchButton" href="#">
        <SearchOutlined style={{ fontSize: 25 }} />
      </button>
    </div>
  );
}

export default Search;
