import React, { useEffect, useState } from "react";
import hitAPI from "../api/index";

import Header from "./Header";
import LinkList from "./LinkList";
import Linkmodal from "./Linkmodal";
import Input from "@material-ui/core/Input";

import Button from "@material-ui/core/Button";

import "./modals.css";
import "./header.css";
import "./linklist.css";

const App = () => {
  const [postModal, setPostModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [linkID, setLinkID] = useState(null);
  const [linkComment, setLinkComment] = useState(null);
  const [linkTags, setLinkTags] = useState(null);
  const [links, setLinks] = useState([]); //list of all links.
  const [searchTerm, setSearchTerm] = useState("");

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
      <div className='search-post'>
        <Input
          className='searchbar'
          type='search'
          placeholder='Search for Links'
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
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
        links={links}
        setLinks={setLinks}
        linkTags={linkTags}
        setLinkTags={setLinkTags}
      />
      <LinkList
        setEditModal={setEditModal}
        setLinkID={setLinkID}
        setLinkComment={setLinkComment}
        setLinks={setLinks}
        links={filterLink()}
      />
    </>
  );
};

export default App;
