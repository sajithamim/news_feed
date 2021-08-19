import React from "react";
import "./Overview.css";

const OverviewContent = () => {
  
  const accessToken = localStorage.getItem("accessToken");
  console.log("accessToken", accessToken);
  return (
    <div className="OverviewStyle">
      <h3>CLINICTOPICS</h3>
      <h4>News and Views in Medical Research</h4>

      <h5>Use ClinicTopics mobile app</h5>
      <h6>
        Please open this page from ClinicTopics mobile app to do password less
        login.
      </h6>
    </div>
  );
};

export default OverviewContent;
