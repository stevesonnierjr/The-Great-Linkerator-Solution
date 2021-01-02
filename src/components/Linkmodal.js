import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import hitAPI from "../api/index";

const Linkmodal = ({
  postModal,
  setPostModal,
  editModal,
  setEditModal,
  linkID,
  setLinkID,
  linkComment,
  setLinkComment,
  linkCount,
  setLinkCount,
}) => {
  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState([]);

  function clear() {
    setLink("");
    setComment("");
    setLinkComment(null);
    setLinkCount(null);
    setLinkID(null);
    setTags([]);
  }
  // const [links, setLinks] = useState([]);
  // console.log(links);

  // useEffect(() => {
  //   hitAPI("GET", "links")
  //   .then((data) => {
  //     setLinks(data);
  //   })
  //   .catch(console.error);
  // }, []);

  return (
    <>
      {/* <Button
      variant="contained"
      color="primary"
      onClick={setPostModal(true)}>New Link</Button> */}
      {postModal ? (
        <Modal className="post-modal">
          <h2>Create a link</h2>
          <div className="form">
            <form
              classname="post-form"
              onSubmit={(event) => {
                event.preventDefault();

                const body = {
                  link,
                  comment,
                };

                hitAPI("POST", "links", body).then((data) => {
                  console.log("post successful!");
                  console.log(data);
                  clear();
                  setPostModal(false);
                });
              }}
            >
              <div className="inputs">
                <input
                  type="text"
                  placeholder="Enter URL"
                  value={link}
                  onChange={(event) => setLink(event.target.value)}
                />
                <textarea
                  placeholder="Enter a comment"
                  rows="4"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                ></textarea>
              </div>
              <div className="buttons">
                <Button className="submit" variant="contained" color="primary">
                  Submit
                </Button>
                <Button
                  clasName="cancel"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    clear();
                    setPostModal(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      ) : null}
      {editModal ? (
        <Modal className="edit-modal">
          <h2>Edit link</h2>
          <div className="form">
            <form
              classname="post-form"
              onSubmit={(event) => {
                event.preventDefault();

                const body = {
                  comment: linkComment,
                  clickCount: linkCount + 1,
                };

                hitAPI("PATCH", `links/${linkID}`, body).then((data) => {
                  console.log("update successful!");
                  console.log(data);
                  clear();
                  setEditModal(false);
                });
              }}
            >
              <div className="inputs">
                <textarea
                  placeholder="Enter a comment"
                  rows="4"
                  value={linkComment}
                  onChange={(event) => setLinkComment(event.target.value)}
                ></textarea>
              </div>
              <div className="buttons">
                <Button className="submit" variant="contained" color="primary">
                  Submit
                </Button>
                <Button
                  clasName="cancel"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    clear();
                    setEditModal(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Linkmodal;
