import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Header from "./Header";

import LinkList from './LinkList';
import Linkmodal from "./Linkmodal";


const App = () => {
    return (
    <>
    <Header />
    <Linkmodal />
    <LinkList />
    </>
    );
  };


  export default App;