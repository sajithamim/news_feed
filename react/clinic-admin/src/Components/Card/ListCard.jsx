import React from "react";
import "./ListCard.css";

const ListCard = (props) => {
  return (
    <div className="listcard">
      <div className="listcard-body">
        <div className="listcard-text">{props.content}</div>
      </div>
    </div>
  );
};

export default ListCard;
