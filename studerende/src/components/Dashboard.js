import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import styled from 'styled-components';
const ReactGridLayout = WidthProvider(RGL);

const DragField = styled(ReactGridLayout)`
  margin: 16px 28px 50px 28px;
`

const Dashboard = ({ children }) => {
  return (
    <DragField
      margin={[10, 10]}
      containerPadding={[0, 0]}
      cols={50}
      breakpoints={50}
      rowHeight={50}
      style={{height: "100%", width: "100%"}}
      autoSize={true}
     >
      {children}
    </DragField>
  );
};

export default Dashboard;
