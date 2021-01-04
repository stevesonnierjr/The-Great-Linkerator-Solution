import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Input from "@material-ui/core/Input";
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
  links,
  setLinks,
  linkTags,
  setLinkTags,
}) => {
  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const [tag, setTag] = useState("");

  function clear() {
    setLink("");
    setComment("");
    setLinkComment(null);
    setLinkID(null);
    setTag("");
  }

  return (
    <>
      <Modal
        className='modal'
        open={postModal}
        onClose={() => {
          clear();
          setPostModal(false);
        }}>
        <div className='post-content'>
          <div className='heading'>
            <h1>Create a Link</h1>
          </div>
          <div className='modal-body'>
            <form
              className='post-form'
              onSubmit={(event) => {
                event.preventDefault();

                const body = {
                  link,
                  comment,
                };

                hitAPI("POST", "links", body)
                  .then((data) => {
                    console.log("post successful!");
                    setLinks([data, ...links]);
                  })
                  .catch(console.error);

                clear();
                setPostModal(false);
              }}>
              <div className='inputs'>
                <Input
                  type='url'
                  placeholder='https://example.com'
                  value={link}
                  onChange={(event) => setLink(event.target.value)}
                  required
                />
                <Input
                  type='text'
                  multiline={true}
                  placeholder='Enter a comment'
                  rows='4'
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  required
                />
                <Input
                  type='text'
                  placeholder='Tag functions coming soon!'
                  value={tag}
                  disabled //remove this attribute once tag functions are being set up
                  onChange={(event) => setTag(event.target.value)}
                />
              </div>
              <div className='buttons'>
                <div className='cancel'>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => {
                      clear();
                      setPostModal(false);
                    }}>
                    Cancel
                  </Button>
                </div>
                <div className='submit'>
                  <Button type='submit' variant='contained' color='primary'>
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <Modal
        className='modal'
        open={editModal}
        onClose={() => {
          clear();
          setEditModal(false);
        }}>
        <div className='edit-content'>
          <div className='heading'>
            <h1>Edit Link</h1>
          </div>
          <div className='modal-body'>
            <form
              className='edit-form'
              onSubmit={(event) => {
                event.preventDefault();

                const body = {
                  comment: linkComment,
                };

                hitAPI("PATCH", `links/${linkID}`, body)
                  .then((data) => {
                    console.log("update successful!");
                    setLinks(
                      links.map((link) => {
                        if (link.id === data.id) {
                          console.log("match found!");
                          return { ...link, comment: data.comment };
                        } else {
                          console.log("match not found!");
                          return link;
                        }
                      })
                    );
                  })
                  .catch(console.error);

                clear();
                setEditModal(false);
              }}>
              <div className='inputs'>
                <Input
                  type='text'
                  multiline={true}
                  placeholder='Enter a comment'
                  rows='4'
                  value={linkComment}
                  onChange={(event) => setLinkComment(event.target.value)}
                  required
                />
                <Input
                  type='text'
                  placeholder='Tag functions coming soon!'
                  value={linkTags}
                  disabled //remove this attribute once tag functions are being set up
                  onChange={(event) => setLinkTags(event.target.value)}
                />
              </div>
              <div className='buttons'>
                <div className='cancel'>
                  <Button
                    className='cancel'
                    variant='contained'
                    color='secondary'
                    onClick={() => {
                      clear();
                      setEditModal(false);
                    }}>
                    Cancel
                  </Button>
                </div>
                <div className='submit'>
                  <Button
                    className='submit'
                    type='submit'
                    variant='contained'
                    color='primary'>
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Linkmodal;
