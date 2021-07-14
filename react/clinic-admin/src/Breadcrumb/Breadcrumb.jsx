import React from "react";
import ListCard from "../Components/Card/ListCard";
import "./Breadcrumb.css";

const Breadcrumb = (props) => {
  return (
    <div className="bread">
      <ListCard content={props.path} />
    </div>
  );
};

export default Breadcrumb;
