import React, { useState } from "react";
import hitAPI from "../api/index";

import { Card } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const LinkList = ({
  setEditModal,
  setLinkID,
  setLinkComment,
  setLinkCount,
  links,
}) => {
  const [high, setHigh] = useState(true);
  const [low, setlow] = useState(false);

  function sortLinks() {
    if ((high === true) & (low === false)) {
      links.sort((a, b) => b.clickcount - a.clickcount);
      setHigh(!high);
      setlow(!low);
    } else if ((high === false) & (low === true)) {
      links.sort((a, b) => a.clickcount - b.clickcount);
      setHigh(!high);
      setlow(!low);
    }
  }

  return (
    <div className='link-list'>
      <h2>Links</h2>
      <table>
        <thead>
          <tr>
            <th style={{ width: "48%" }}>URL</th>
            <th
              className='clickable'
              style={{ width: "1%" }}
              onClick={sortLinks}>
              Clicks
            </th>
            <th style={{ width: "25%" }}>Comments</th>
            <th style={{ width: "25%" }}>Tags</th>
            <th style={{ width: "1%" }}></th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => {
            return (
              <tr className='link' key={link.id}>
                <td style={{ width: "48%" }}>
                  <a href={link.link} target='_blank'>
                    {link.link}
                  </a>
                </td>
                <td style={{ width: "1%" }}>{link.clickcount - 1}</td>
                <td style={{ width: "25%" }}>{link.comment}</td>
                <td style={{ width: "25%" }}>{link.tags}</td>
                <td style={{ width: "1%" }}>
                  <IconButton
                    className='edit'
                    onClick={() => {
                      setLinkID(link.id);
                      setLinkComment(link.comment);
                      setLinkCount(link.clickCount);
                      setEditModal(true);
                    }}>
                    <EditIcon className='icon' />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LinkList;
