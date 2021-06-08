import React from "react";
import "../App.css";
import { Card, Progress} from "antd";
import styled from 'styled-components';
import UploadIcon from "./UploadIcon";

const HOST = 'https://vm29.exsys2021.cs.au.dk/express/';
//const HOST = 'http://localhost:3000/express/';

const StyledCard = styled(Card)`
    .ant-card-head {
        border: none;
        font-size: 1.1rem;
        min-height: 0;
    }

    .ant-card-head-title {
        padding: 0;
    }

    .ant-card-body {
        margin: 2px 24px;
        font-size: 0.95rem;
    }
`

class Handin extends React.Component {
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
        fetch(HOST +'handins', requestOptions)
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

    createDiagrams = (props) => {
        if (props.icon.icon == null) {
            switch (props.measurement) {
                case ("days"):
                    return <Progress type={props.type} percent={props.days_used / props.days_total * 100} status={props.status} width={props.width} format={() => `${props.days_total - props.days_used + " " + props.measurement}`} />
                case ("done"):
                    return  <Progress type={props.type} percent={props.percent} status={props.status} width={props.width} />
                case ("points"):
                    return <Progress type={props.type} percent={props.points_given / props.points_total * 100} status={props.status} width={props.width} format={() => `${props.points_given + " / " + props.points_total}`} />
            }
        }
        else {
            return <UploadIcon items={props} />
        }
    }

createHandins = () => {
    const elements = []
    
    for (let i = 0; i < this.state.items.length; i++) {
        elements.push(
        <div key={this.state.items[i].id} className={"handin-child"}>
            <div className={"handin-info"}>
                <StyledCard
                        title={<a href={this.state.items[i].url}>{this.state.items[i].title}</a>}
                        bordered={false}
                        className={"handin-info"}
                    >   
                        {this.state.items[i].course_nickname}
                </StyledCard>
            </div>
                
            <div className="handin-status">
                {this.createDiagrams(this.state.items[i])}
            </div>
        </div>)
    }

    return elements
}

  render() {
      return this.createHandins()
  }
};

export default Handin;
