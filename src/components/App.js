import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Header from "./Header";
import SearchBar from "./SearchBar";

import LinkList from "./LinkList";

const App = () => {
  return (
    <>
      <Header />
      <SearchBar />

      <LinkList />
    </>
  );
};

export default App;
