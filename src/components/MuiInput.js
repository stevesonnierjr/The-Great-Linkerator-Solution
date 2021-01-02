import React, { useState } from "react";

const searchForm = ({ links, setLinks }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Input
      type='search'
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
    />
  );
};

export default searchForm;
