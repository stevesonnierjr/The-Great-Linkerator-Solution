import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Input from "@material-ui/core/Input"
import hitAPI from "../api/index";
import { blue } from "@material-ui/core/colors";

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
  links,
  setLinks,
}) => {
  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const [tag, setTag] = useState("");

  function clear() {
    setLink('');
    setComment('');
    setLinkComment(null);
    setLinkCount(null);
    setLinkID(null);
    setTag("");
  }

  console.log('I am postModal: ', postModal);
  console.log('I am editModal: ', editModal);

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
          <div className="heading">
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
                console.log('I am body: ', body);
                console.log('I am link: ', body.link);
                console.log('I am comment: ', body.comment);

                hitAPI('POST', 'links', body)
                  .then((data) => {
                    console.log('post successful!');
                    console.log('I am data', data);
                  })
                  .catch(console.error);

                clear();
                setPostModal(false);
              }}
            >
              <div className='inputs'>
                <Input
                  type='text'
                  placeholder='Enter URL exactly as it appears in browser'
                  value={link}
                  onChange={(event) => setLink(event.target.value)}
                  required
                />
                <Input
                  type="text"
                  multiline="true"
                  placeholder='Enter a comment'
                  rows='4'
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  required
                />
                <Input
                  type='text'
                  placeholder='Enter tags'
                  value={tag}
                  onChange={(event) => setTag(event.target.value)}
                />
              </div>
              <div className='buttons'>
                <div className="cancel">
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
                <div className="submit">
                  <Button
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

      <Modal
        className='modal'
        open={editModal}
        onClose={() => {
          clear();
          setEditModal(false);
        }}>
        <div className='edit-content'>
          <h1>Edit Link</h1>
          <div className='form'>
            <form
              className='edit-form'
              onSubmit={(event) => {
                event.preventDefault();

                const body = {
                  comment: linkComment,
                };
                console.log('I am body: ', body);
                console.log('I am comment: ', body.comment);

                hitAPI('PATCH', `links/${linkID}`, body)
                  .then((data) => {
                    console.log('update successful!');
                    console.log(data);
                  })
                  .catch(console.error);

                clear();
                setEditModal(false);
              }}
            >
              <div className='inputs'>
                <textarea
                  placeholder='Enter a comment'
                  rows='4'
                  value={linkComment}
                  onChange={(event) => setLinkComment(event.target.value)}
                  required
                ></textarea>
              </div>
              <div className='buttons'>
                <Button
                  className='cancel'
                  variant='contained'
                  color='secondary'
                  onClick={() => {
                    clear();
                    setEditModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className='submit'
                  type='submit'
                  variant='contained'
                  color='primary'
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Linkmodal;
