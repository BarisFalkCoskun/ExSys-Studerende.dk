import React from "react";
import { Icon } from '@iconify/react';
import uploadOption from '@iconify-icons/grommet-icons/upload-option';
import { Progress} from "antd";
import circleAlert from '@iconify-icons/grommet-icons/circle-alert';

// const HOST = 'https://vm29.exsys2021.cs.au.dk/express/';
const HOST = 'http://localhost:3000/express/';

class UploadIcon extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isHovered: false,
        pdf: "",
        isUploaded: false,
      };

      this.createUploadButton = this.createUploadButton.bind(this);
    
      this.toggleHover = this.toggleHover.bind(this);
    }
    
    toggleHover() {
      this.setState(prevState => ({isHovered: !prevState.isHovered}));
    }
  
    handleUpload = async e => {
   
      e.preventDefault();
      if (e.target.files.length) {
        this.setState({pdf: e.target.files[0]})
      }
      const formData = new FormData();
      
      formData.append("pdf", this.state.pdf);
  
      await fetch(HOST + "upload_handin", {
        method: "POST",
        headers: {
          "Content-Type": "application/pdf",
        },
        body: formData
      });
      this.setState({isUploaded: true})

    };

    hasBeenUploaded = () => {
      this.setState({isUploaded: true})
      return <Icon icon={circleAlert} color="#C0BA36" width="45" height="45" />
    }

    createUploadButton = () => {

      if (this.state.isHovered) {
        return <React.Fragment>
      <label htmlFor="upload-button">
            <Icon htmlFor="contained-button-file" icon={uploadOption} className={this.props.items.icon.class_name} width={this.props.items.icon.width} height={this.props.items.icon.height} color={this.props.items.icon.color} />
          </label>
        </React.Fragment>
      }
      else {
        return <Progress type={this.props.items.type} className={this.props.items.class_name} percent={this.props.items.days_used / this.props.items.days_total * 100} width={this.props.items.width} height={this.props.items.height} format={() => `${this.props.items.days_total - this.props.items.days_used + " " + this.props.items.measurement}`} />;
      }
    }

    render() {
      return (
          (this.state.isUploaded === false) ?
          <span className={"hovered"} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
            {this.createUploadButton()}
            <input type="file" id="upload-button" style={{ display: "none" }} onChange={this.handleUpload} />
          </span> : <Icon icon={circleAlert} color="#C0BA36" width="45" height="45" />
      );
    }
  }

  export default UploadIcon;