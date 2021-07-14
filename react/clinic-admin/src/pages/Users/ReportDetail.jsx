import React from "react";
import { Container } from "react-bootstrap";
import Breadcrumb from "../../../SharedFeatures/Breadcrumb/Breadcrumb";
import Card from "../../../Components/Card/Card";
import DetailContent from "./DetailContent";

const ReportDetail = () => {
  return (
    <div className="main-content">
      <Container fluid>
        <div>
          <Breadcrumb path="Reports / Report Details" />
          <Card
            content={
              <div>
                <div
                  className="content-heading-innerpage"
                >
                  Report Details
                </div>
                <div className="content-content">
                  <DetailContent />
                </div>
              </div>
            }
            title={false}
            footer={false}
          />
        </div>
      </Container>
    </div>
  );
};

export default ReportDetail;
