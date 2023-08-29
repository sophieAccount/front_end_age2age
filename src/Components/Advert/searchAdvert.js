import React, { useState } from "react";

const SearchAdvert = ({ callback }) => {
  const [innerValue, setInnerValue] = useState("");
  const handleSubmit = e => {
    e.preventDefault()
    callback(innerValue)
  }
  return (
    <form className="searchBar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="searchBarInput"
        value={innerValue}
        onChange={(e) => setInnerValue(e.target.value)}
      />
    </form>
  );
};
export default SearchAdvert;