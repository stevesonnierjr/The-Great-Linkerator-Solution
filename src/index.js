import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return <h1>YEET MAN</h1>;
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
