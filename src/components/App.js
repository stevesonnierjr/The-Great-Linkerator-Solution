import React, { useEffect, useState } from "react";
import hitAPI from "../api/index";
// import { Route, Redirect, Switch } from "react-router-dom";
// import { Route, Redirect, Switch } from "react-router-dom";

import Header from "./Header";
import LinkList from "./LinkList";
import Linkmodal from "./Linkmodal";
import Input from "@material-ui/core/Input";

import Button from "@material-ui/core/Button";

import "./modals.css";
import "./header.css";
import "./linklist.css";
import "./searchbar.css";

const App = () => {
  // initialLinks is temporary to help me style
  const initialLinks = [
    {
      id: "ab38f156-7ceb-468c-8df4-3bb640b9f77e",
      link: "https://www.google.com/",
      comment: "go to google, go to google, go to google",
      clickcount: 10,
    },
    {
      id: "0df12366-98f3-46cf-ac09-943fb1a988f9",
      link: "https://www.youtube.com/",
      comment: "go to youtube, go to youtube, go to youtube",
      clickcount: 35,
    },
    {
      id: "0df12366-98f3-46cf-ac09-943fb1a988l9",
      link: "https://www.ebay.com/",
      comment: "go to ebay, go to ebay, go to ebay",
      clickcount: 5,
    },
    {
      id: "0df12366-98f3-46cf-ac09-943fb1a988h9",
      link: "https://www.amazon.com/",
      comment: "go to amazon, go to amazon, go to amazon",
      clickcount: 15,
    }
  ];
  const [postModal, setPostModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [linkID, setLinkID] = useState(null);
  const [linkComment, setLinkComment] = useState(null);
  const [linkCount, setLinkCount] = useState(null);
  const [links, setLinks] = useState(initialLinks); //list of all links. replace initialLinks with [] when done styling
  const [searchTerm, setSearchTerm] = useState("");
  console.log(links);

  // useEffect(() => {
  //   hitAPI("GET", "links")
  //   .then((data) => {
  //     setLinks(data);
  //   })
  //   .catch(console.error);
  //   }, []);

  function filterLink() {
    return links.filter((url) => {
      return url.link.includes(searchTerm.toLowerCase());
    });
  }

  return (
    <>
      <Header />
      <div className='search-post'>
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
        <Button
          className='post-link'
          variant='contained'
          color='primary'
          onClick={() => setPostModal(true)}>
          New Link
        </Button>
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
        setLinks={setLinks}
      />
      <LinkList
        setEditModal={setEditModal}
        setLinkID={setLinkID}
        setLinkComment={setLinkComment}
        setLinkCount={setLinkCount}
        setLinks={setLinks}
        links={filterLink()}
      />
    </>
  );
};

export default App;
