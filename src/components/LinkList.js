import React, { useState } from "react";
import hitAPI from "../api/index";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const LinkList = ({
  setEditModal,
  setLinkID,
  setLinkComment,
  links,
  setLinks,
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

  const updateClickCount = async (linkId, currentClickCount) => {
    const body = {
      clickcount: currentClickCount + 1,
    };
    const endpoint = `links/${linkId}`;

    hitAPI("PATCH", endpoint, body)
      .then((data) => {
        console.log("click increment successful!");
        if (data) {
          setLinks(
            links.map((link) => {
              if (link.id === linkId) {
                return { ...link, clickcount: link.clickcount + 1 };
              } else {
                return link;
              }
            })
          );
        }
      })
      .catch(console.error);
  };

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
                  <a
                    href={link.link}
                    target='_blank'
                    onClick={() => updateClickCount(link.id, link.clickcount)}>
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
