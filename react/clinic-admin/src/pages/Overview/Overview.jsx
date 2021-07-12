import React from "react";
import OverviewContent from "./OverviewContent";

const Overview = () => {
  const access = localStorage.getItem("accessToken")

console.log('accessToken Overview', access)
  return (
    <div className="home">
      <OverviewContent />
    </div>
  );
};

export default Overview;
