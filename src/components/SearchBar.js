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
      dataSource={state.dataSource}
      onChange={(value) =>
        setState({ dataSource: [value, value + value, value + value + value] })
      }
      onRequestSearch={() => console.log("onRequestSearch")}
      style={{
        margin: "0 auto",
        maxWidth: 800,
      }}
    />
  );
};

export default SearchBar;
