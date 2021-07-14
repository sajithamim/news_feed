import React from "react";
import { Input } from "antd";
import { Col, Row } from "react-bootstrap";

const DetailContent = () => {
  return (
    <div>
      <div className="detailpage-input">
        <Row>
          <Col md="3">Customer ID</Col>
          <Col md="5">
            <Input placeholder="Basic usage" />
          </Col>
        </Row>
      </div>
      <div className="detailpage-input">
        <Row>
          <Col md="3">Date</Col>
          <Col md="5">
            <Input placeholder="Basic usage" />
          </Col>
        </Row>
      </div>
      <div className="detailpage-input">
        <Row>
          <Col md="3">Customer Name</Col>
          <Col md="5">
            <Input placeholder="Basic usage" />
          </Col>
        </Row>
      </div>
      <div className="detailpage-input">
        <Row>
          <Col md="3">Service Category</Col>
          <Col md="5">
            <Input placeholder="Basic usage" />
          </Col>
        </Row>
      </div>
      <div className="detailpage-input">
        <Row>
          <Col md="3">Service Area/ Location</Col>
          <Col md="5">
            <Input placeholder="Basic usage" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DetailContent;
