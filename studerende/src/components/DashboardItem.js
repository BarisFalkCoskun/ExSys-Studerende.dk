import React from "react";
import { Card } from "antd";
import styled from 'styled-components';
import "../App.css";

const StyledCard = styled(Card)`
  box-shadow: 0px 2px 4px rgba(141, 149, 166, 0.1);
  border-radius: 4px;

  .ant-card-head {
    border: none;
  }
  .ant-card-body {
      padding: 0;
  }
`

const DashboardItem = (props) => (
  <StyledCard
    title={props.title}
    bordered={false}
    style={{
      height: "100%",
      width: "100%",
      overflow: "scroll"
    }}
  >
    {props.children}
  </StyledCard>
);

export default DashboardItem;
