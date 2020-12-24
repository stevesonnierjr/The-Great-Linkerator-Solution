import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Header from "./Header";

import LinkList from './LinkList';


const App = () => {
    return (
    <>
    <Header />
  
    <LinkList />
    </>
    );
  };


  export default App;