import React, { useEffect, useState } from "react";
import hitAPI from "../api/index";
// import { Route, Redirect, Switch } from "react-router-dom";

import Header from "./Header";
import LinkList from "./LinkList";
import Linkmodal from "./Linkmodal";
import Input from "@material-ui/core/Input";
import "./searchbar.css";

const App = () => {
  const [postModal, setPostModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [linkID, setLinkID] = useState(null);
  const [linkComment, setLinkComment] = useState(null);
  const [linkCount, setLinkCount] = useState(null);
  const [links, setLinks] = useState([]); //list of all links
  const [searchTerm, setSearchTerm] = useState("");
  console.log(links);

  useEffect(() => {
    hitAPI("GET", "links")
      .then((data) => {
        setLinks(data);
      })
      .catch(console.error);
  }, []);

  function filterLink() {
    return links.filter((url) => {
      return url.link.includes(searchTerm.toLowerCase());
    });
  }

  return (
    <>
      <Header />
      <div className="search-post">
        <Input
          className="searchbar"
          type="search"
          placeholder="Search for Links"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            console.log(searchTerm);
          }}
        />
      </div>

      <Linkmodal
        postModal={postModal}
        setPostModal={setPostModal}
        editModal={editModal}
        setEditModal={setEditModal}
        linkID={linkID}
        setLinkID={setLinkID}
        linkComment={linkComment}
        setLinkComment={setLinkComment}
        linkCount={linkCount}
        setLinkCount={setLinkCount}
      />
      <LinkList
        setEditModal={setEditModal}
        setLinkID={setLinkID}
        setLinkComment={setLinkComment}
        setLinkCount={setLinkCount}
        links={filterLink()}
      />
    </>
  );
};

export default App;
