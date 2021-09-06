import React from "react";
import "./NoConnection.css";

const NoConnection = () => {
  
  const accessToken = localStorage.getItem("accessToken");
  return (
    <div className="NoConnectionStyle">
      <h4>No Internet Connection</h4>
      <h5>Check your Connection</h5>
    </div>
  );
};

export default NoConnection;
