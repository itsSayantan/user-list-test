import React from "react";

import "./SearchBar.css";

const SearchBar = ({ onChange }) => {
  return (
    <div className="search-bar-wrapper">
      <input
        className="search-bar-input"
        onChange={onChange}
        placeholder="Type first name to search user"
      />
    </div>
  );
};

export default SearchBar;
