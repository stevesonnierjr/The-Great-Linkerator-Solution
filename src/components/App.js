import React, { useEffect, useState } from "react";
import hitAPI from '../api/index';
// import { Route, Redirect, Switch } from "react-router-dom";

import Header from "./Header";
import LinkList from "./LinkList";
import Linkmodal from "./Linkmodal";
import MuiInput from "./MuiInput";

const App = () => {
  const [postModal, setPostModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [linkID, setLinkID] = useState(null);
  const [linkComment, setLinkComment] = useState(null);
  const [linkCount, setLinkCount] = useState(null);
  const [links, setLinks] = useState([]); //list of all links
  console.log(links);

  useEffect(() => {
    hitAPI("GET", "links")
    .then((data) => {
      setLinks(data);
    })
    .catch(console.error);
  }, []);

  return (
    <>
    <Header />
    <div className="search-post">
      {/* <Search /> */}
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
      setLinkCount={setLinkCount} />
    <LinkList
      setEditModal={setEditModal}
      setLinkID={setLinkID}
      setLinkComment={setLinkComment}
      setLinkCount={setLinkCount}
      links={links} />
    </>
  );
};

export default App;
