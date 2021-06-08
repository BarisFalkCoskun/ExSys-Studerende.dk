import React from "react";
import { Layout, Menu } from "antd";
import styled from 'styled-components';
import "../index.less";

const StyledHeader = styled(Layout.Header)`
  padding: 30px 28px;
`

const StyledMenu = styled(Menu)`
  background: transparent;
  line-height: 41px;
`

const MenuItemStyled = styled(Menu.Item)`
  && {
    top: -22px;
    border-bottom: 4px solid transparent;

    &:hover {
      border-bottom: 4px solid transparent;
      & > a {
        color: #ffffff;
        opacity: 1;
      }
    }
  }
  &&.ant-menu-item-selected
  {
    color: white;
    border-bottom: 4px solid white;

    & > a {
      opacity: 1;
    }
  }
  && > a {
    color: #ffffff;
    opacity: 0.60;
    font-weight: bold;
    letter-spacing: 0.01em;
  }
`

const Logo = styled.div`
  float: left;
  margin-right: 150px;
  height: 89px;
  width: 28px;
  padding-bottom: 300px;
`

const Button = styled.a`
  && {
    background: rgba(237, 237, 255, 0.2);
    border-radius: 4px;
    padding: 8px 10px;
    opacity: 1 !important;
    line-height: 16px;
    min-width: 71px;
    text-align: center;
    margin-top: 5px;
    font-size: 13px;
    margin: 0;
    &:hover {
      background: rgba(243, 243, 251, 0.15);
    }
  }
`

const Header = () => (
  <StyledHeader>
    <Logo>
      <h1>Studerende.dk</h1>
    </Logo>
    <StyledMenu mode="horizontal">
      <MenuItemStyled key="/">
        <a href="/">MitStudie</a>
      </MenuItemStyled>
      <MenuItemStyled key="/Studieoverblik">
        <a href="https://mitstudie.au.dk/da/timeline">Studieoverblik</a>
      </MenuItemStyled>
      <MenuItemStyled key="/kort">
        <a href="https://mitstudie.au.dk/da/map">Kort over AU</a>
      </MenuItemStyled>
      <MenuItemStyled className={"right-buttons"} key="user">
        <Button href="/user">User</Button>
      </MenuItemStyled>
      <MenuItemStyled className={"right-buttons"} key="name-of-user">
        <Button href="/name">Name</Button>
      </MenuItemStyled>
      <MenuItemStyled className={"right-buttons"} key="notification">
        <Button href="/notification">Bell</Button>
      </MenuItemStyled>
    </StyledMenu>
  </StyledHeader>
);

export default Header;
