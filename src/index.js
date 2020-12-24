import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import LinkList from './components/LinkList';

const App = () => {
  return (
  <>
  <h1>Great Linkerator</h1>
  <LinkList />
  </>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
