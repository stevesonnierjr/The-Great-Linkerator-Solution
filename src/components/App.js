import React, { useEffect, useState } from "react";
import hitAPI from '../api/index';
import Button from '@material-ui/core/Button';
// import { Route, Redirect, Switch } from "react-router-dom";

import Header from "./Header";
// import Search from "./SearchBar";
import LinkList from './LinkList';
import Linkmodal from "./Linkmodal";

const App = () => {
  // initialLinks is temporary to help me style
  const initialLinks = [
    {
    id: "ab38f156-7ceb-468c-8df4-3bb640b9f77e",
    link: "www.google.com",
    comment: "go to google",
    clickcount: 1
    },
    {
    id: "0df12366-98f3-46cf-ac09-943fb1a988f9",
    link: "www.youtube.com",
    comment: "go to youtube",
    clickcount: 1
    }
  ]
  const [postModal, setPostModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [linkID, setLinkID] = useState(null);
  const [linkComment, setLinkComment] = useState(null);
  const [linkCount, setLinkCount] = useState(null);
  const [links, setLinks] = useState(initialLinks); //list of all links. replace initialLinks with [] when done styling
  console.log(links);

  useEffect(() => {
    // hitAPI("GET", "links")
    // .then((data) => {
    //   setLinks(data);
    // })
    // .catch(console.error);
  }, []);

  return (
    <>
    <Header />
    <div className="search-post">
      <Button
        variant="contained"
        color="primary"
        onClick={() => setPostModal(true)}
      >New Link</Button>
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
      links={links}
      setLinks={setLinks} />
    <LinkList
      setEditModal={setEditModal}
      setLinkID={setLinkID}
      setLinkComment={setLinkComment}
      setLinkCount={setLinkCount}
      links={links}
      setLinks={setLinks} />
    </>
    );
  };

export default App;
