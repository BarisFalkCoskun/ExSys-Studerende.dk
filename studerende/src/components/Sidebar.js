import React from "react";
import { Layout, Menu } from "antd";
import "../index.less";
import { Icon, InlineIcon } from '@iconify/react';
import blackboardIcon from '@iconify-icons/entypo/blackboard';
import bxLibrary from '@iconify-icons/bx/bx-library';
import graduationCap from '@iconify-icons/entypo/graduation-cap';
import openBook from '@iconify-icons/entypo/open-book';
import fileContract from '@iconify-icons/fa-solid/file-contract';
import vCard from '@iconify-icons/entypo/v-card';
import peopleTeam24Filled from '@iconify-icons/fluent/people-team-24-filled';
import documentsSharp from '@iconify-icons/ion/documents-sharp';

const { Sider } = Layout;
const { SubMenu } = Menu;

class Sidebar extends React.Component {
    state = {
      collapsed: false,
    };
  
    onCollapse = collapsed => {
      this.setState({ collapsed });
    };
  
    render() {
      const { collapsed } = this.state;

      return (
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<Icon icon={bxLibrary} />}>
                <a href="http://library.au.dk/">AU Library</a>
                </Menu.Item>
                <Menu.Item key="2" icon={<Icon icon={blackboardIcon} />}>
                <a href="https://blackboard.au.dk/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_1_1">BlackBoard</a>
                </Menu.Item>
                <Menu.Item key="3" icon={<Icon icon={graduationCap} />}>
                <a href="https://sbstads.au.dk/sb_STAP/sb/tilmelding/ekaTilmeldingController?action=init">Digital Eksamen</a>
                </Menu.Item>
                <Menu.Item key="4" icon={<Icon icon={fileContract} />}>
                <a href="https://kontrakt.scitech.au.dk/login">Kontraktgenerator</a>
                </Menu.Item>
                <Menu.Item key="5" icon={<Icon icon={openBook} />}>
                <a href="http://kursuskatalog.au.dk/da/">Kursuskatalog</a>
                </Menu.Item>
                <Menu.Item key="6" icon={<Icon icon={vCard} />}>
                <a href="https://mitstudie.au.dk/da/student-id-card">Studiekort</a>
                </Menu.Item>
                <Menu.Item key="7" icon={<Icon icon={peopleTeam24Filled} />}>
                  <a href="https://mitstudie.au.dk/da/applications">Studienævn</a>
                </Menu.Item>
                <SubMenu key="sub1" icon={<Icon icon={documentsSharp} className={"ant-menu-item-icon"}/>} title="STADS">
                  <Menu.Item key="8"><a href="https://sbstads.au.dk/sb_STAP/sb/tilmelding/ekaTilmeldingController?action=init">Eksamen</a></Menu.Item>
                  <Menu.Item key="9"><a href="https://sbstads.au.dk/sb_STAP/sb/resultater/studresultater.jsp">Karakter</a></Menu.Item>
                  <Menu.Item key="10"><a href="https://sbstads.au.dk/sb_STAP/sb/udskrift/udskriftliste.jsp">Udskrifter</a></Menu.Item>
                  <Menu.Item key="11"><a href="https://sbstads.au.dk/sb_STAP/sb/undervisning/studvistilm.jsp">Undervisning</a></Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
      );
    }
  }

  export default Sidebar;