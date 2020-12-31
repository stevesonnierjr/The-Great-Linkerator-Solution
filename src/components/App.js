import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Header from "./Header";
import LinkList from "./LinkList";
import Linkmodal from "./Linkmodal";
import MuiInput from "./MuiInput";

const App = () => {
  return (
    <>
      <Header />
      <Linkmodal />
      <LinkList />
      <MuiInput links={links} setLinks={setLinks} />
    </>
  );
};

export default App;
