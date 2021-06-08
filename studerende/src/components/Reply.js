import React from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';

class Reply extends React.Component {
  state = { visible: false, placement: 'bottom' };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { placement, visible } = this.state;
    return (
      <>
          <Button type="primary" onClick={this.showDrawer}>
            Open
          </Button>
      </>
    );
  }
}

export default Reply;