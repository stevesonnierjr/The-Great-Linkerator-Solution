import React, { useState, useEffect } from "react";
import SearchBar from "material-ui-search-bar";

const SearchBar = () => {
  const [links, setLinks] = useState([]);
  // console.log(links);

  // useEffect(() => {
  //   hitAPI("GET", "links")
  //     .then((data) => {
  //       setLinks(data);
  //     })
  //     .catch(console.error);
  // }, []);

  return (
    <SearchBar
      value={this.state.value}
      onChange={(newValue) => this.setState({ value: newValue })}
      onRequestSearch={() => doSomethingWith(this.state.value)}
    />
  );
};

export default SearchBar;
