import React from "react";
import { Col } from "antd";
const DetailGridCard = (props) => {
  return (
    <Col lg={6} md={8} xs={24}>
      <div style={{ position: "relative" }}>
        <img
          style={{ width: "100%", height: "320px" }}
          src={props.image}
          alt={props.castName}
        />
      </div>
    </Col>
  );
};

export default DetailGridCard;
