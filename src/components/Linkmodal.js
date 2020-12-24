import React, {useState, useEffect} from "react";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import hitAPI from '../api/index';

const Linkmodal = () => {
  const [showModal, setShowModal] = useState(false);
  const [link, setLink] = useState("");
  const [comment, setComment]= useState("");
  const [tags, setTags] = useState([]);

  function clearInputs() {
    setLink("");
    setComment("");
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
    <Button
      variant="contained"
      color="primary"
      onClick={setShowModal(true)}>New Link</Button>
      {showModal ? (
        <Modal className="modal">
          <h2>Create a link</h2>
          <div className="form">
            <form>
              <div className="inputs">
                <input type="text" placeholder="Enter URL"
                  value={link}
                  onChange={setLink(event.target.value)} />
                <textarea placeholder="Enter a comment" rows="4"
                  value={comment}
                  onChange={setComment(event.target.value)}></textarea>
              </div>
              <div className="buttons">
                <Button>Submit</Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    clearInputs(); 
                    setShowModal(false);                 
                  }}>Cancel</Button>
              </div>
            </form>
          </div>
      </Modal>
      ) : null}
    </>
  );
}

export default Linkmodal;