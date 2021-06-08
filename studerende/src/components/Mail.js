import React from "react";
import { Card, Badge, Modal, Input } from "antd";
import styled from 'styled-components';
import "../App.css"
import { Icon } from '@iconify/react';
import replyIcon from '@iconify-icons/bi/reply';
import trashIcon from '@iconify-icons/bi/trash';
import ReadMore from "./ReadMore";
import DashboardItem from "./DashboardItem";

const HOST = 'https://vm29.exsys2021.cs.au.dk/express/';
//const HOST = 'http://localhost:3000/express/';

const { TextArea } = Input;

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



class Mail extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            open: false,
            replyTo: null,
        };
        this.createMails = this.createMails.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleReply = this.handleReply.bind(this);
        this.setModal2Visible = this.setModal2Visible.bind(this);
    }

    componentDidMount() {
        // GET request using fetch with error handling
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(HOST + 'mails', requestOptions)
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
    
        handleRemove = (id) => {
            this.setState({ items: this.state.items.filter((item) => item.id !== id) })
        }

        handleReply = (id) => {
            const index = this.state.items.findIndex(x => x.id === id)

            this.setState({ open: true, replyTo: this.state.items[index].from })
        }

        setModal2Visible = (response) => {
            this.setState({ open: response })
        }


         
    
createMails = () => {
    const elements = []
    for (let i = 0; i < this.state.items.length; i++) {
        elements.push(
        <div key={this.state.items[i].id} className={"mail-child"}>
            <div className={"mail-info"}>
                <StyledMailCard
                        title={this.state.items[i].from}
                        bordered={false}
                        className={"mail-info"}
                    >
                    <div className={"mail-title"}>
                        {this.state.items[i].title}
                    </div>
                    <ReadMore className={"mail-content line-clamp"}>
                        {this.state.items[i].content}
                    </ReadMore>
                    <Modal
          title={"Reply to " + this.state.replyTo}
          centered
          visible={this.state.open}
          onCancel={() => this.setModal2Visible(false)}
          onOk={() => this.setModal2Visible(false)}
          okText={"Send"}
          mask={false}
        >
        <TextArea showCount={true} bordered={false} placeholder="Message" autoSize={{minRows: 5, maxRows: 20}}/>
        </Modal>
                </StyledMailCard>
                
            </div>
            <div className="email-action">
                <Icon icon={trashIcon} width="25" height="25" className={"email-action-icon trash-icon"} onClick={() => this.handleRemove(this.state.items[i].id)} /> 
                <Icon icon={replyIcon} width="30" height="30" className={"email-action-icon reply-icon"} onClick={() => this.handleReply(this.state.items[i].id)} />
            </div>
        </div>)
    }

    return (<Badge className={"email-numbers"} count={this.state.items.length}>
                <DashboardItem title={"Mails"}>
                    {elements}
                </DashboardItem>
            </Badge>)
}

  render() {
      return this.createMails()
  }
};

export default Mail;