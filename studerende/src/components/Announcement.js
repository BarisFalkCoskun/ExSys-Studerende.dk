import React from "react";
import { Card } from "antd";
import styled from 'styled-components';
import "../App.css"
import ReadMore from "./ReadMore";

const HOST = 'https://vm29.exsys2021.cs.au.dk/express/';
//const HOST = 'http://localhost:3000/express/';

const StyledMailCard = styled(Card)`
  
  .ant-card-head {
    min-height: 0;
  }

  .mail-title {
    font-size: 1rem;
    font-weight: normal;
    color: rgba(67, 67, 107, .8);
    margin-top: 0;
  }

  .announcement-title {
    font-size: 1rem;
    font-weight: normal;
    color: rgba(67, 67, 107, .8);
    margin-top: 0;
  }

  .ant-card-head-title {
    padding: 0;
    padding-top: 10px;
    padding-bottom: 2px;
    font-weight: bold;
    font-size: 1.1rem;
  }

  .ant-card-body {
    margin: 0 5px 3px 25px;
    font-size: 0.95rem;
    max-width: 100%;
  }

  .mail-content p {
    padding: 0 0;
  }
`

class Announcement extends React.Component {
    constructor() {
        super();
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        // GET request using fetch with error handling
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(HOST + 'announcements', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
      
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }   
            
                this.setState({ items: data })
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
        }
    
createAnnouncements = () => {
    const elements = []
    for (let i = 0; i < this.state.items.length; i++) {
        elements.push(
        <div key={this.state.items[i].id} className={"announcement-child"}>
            <div className={"announcement-info"}>
                <StyledMailCard
                        title={this.state.items[i].course}
                        bordered={false}
                        className={"announcement-info"}
                    >
                    <div className={"announcement-title"}>
                        {this.state.items[i].title}
                    </div>
                    <ReadMore className={"announcement-content"}>
                        {this.state.items[i].content}
                    </ReadMore>
                </StyledMailCard>
            </div>
        </div>)
    }

    return elements
}

  render() {
      return this.createAnnouncements()
  }
};

export default Announcement;