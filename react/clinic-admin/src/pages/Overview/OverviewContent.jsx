import React, { useEffect } from "react";
import "./Overview.css";
import { useHistory } from "react-router-dom";

const OverviewContent = () => {

  const accessToken = localStorage.getItem("accessToken");
  let history = useHistory();
  useEffect(() => {
    if (accessToken === null || accessToken === undefined) {
      history.push("/login");
    }
  }, [])

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
