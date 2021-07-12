import React from "react";
import OverviewContent from "./OverviewContent";

const Overview = () => {
  const access = localStorage.getItem("accessToken")


  return (
    <div className="home">
      <OverviewContent />
    </div>
  );
};

export default Overview;
