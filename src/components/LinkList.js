import React, {useState, useEffect} from "react";
import { Card } from "@material-ui/core";
import hitAPI from '../api/index';

const LinkList = () => {
  const [links, setLinks] = useState([]);
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
    <h3>link list</h3>
    <div className="link-list">
      {links ? (
        links.map((link) => {
          return (<Card className="link" key={link.id}>
            <h1><a href={link.link}>{link.link}</a></h1>
            <h3>{link.comment}</h3>
            <p>{link.clickCount}</p>
          </Card>
        );
      })
      ) : (
        <h1>Links should go here</h1>
      )}
    </div>
    </>
  );
}

export default LinkList;