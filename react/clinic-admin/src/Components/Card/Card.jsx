import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        {props.title && (
          <div>
            <h6 className="card-title">{props.titlecontent}</h6>
            <hr />
          </div>
        )}
        <div className="card-text">{props.content}</div>
        {props.footer && (
          <div className="card-footer text-muted">{props.footercontent}</div>
        )}
      </div>
    </div>
  );
};

export default Card;
