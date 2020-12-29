import React, {useState, useEffect} from "react";
import hitAPI from '../api/index';

import { Card } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from'@material-ui/icons/Edit';

const LinkList = ({
  setEditModal,
  setLinkID,
  setLinkComment,
  setLinkCount
}) => {
  
  return (
    <div className="link-list">
      <h3>link list</h3>
      {links ? (
        links.map((link) => {
          return (
          <Card className="link" key={link.id}>
            <h1><a href={link.link}>{link.link}</a></h1>
            <h3>{link.comment}</h3>
            <p>{link.clickCount}</p>
            <IconButton className="edit"
              onClick={() => {
                setLinkID(link.id)
                setLinkComment(link.comment)
                setLinkCount(link.clickCount)
                setEditModal(true)
              }}>
              <EditIcon />
            </IconButton>
          </Card>
        );
      })
      ) : (
        <h1>Links should go here</h1>
      )}
    </div>
  );
}

export default LinkList;