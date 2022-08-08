import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CDBNavbar, CDBInput } from "cdbreact";

import { Header } from "./Navbar.style";


const Navbar = () => {
  const { darkMode, lightTheme, darkTheme } = useSelector(state => state.theme);
  const dispatch = useDispatch();
  let theme = darkMode ? darkTheme : lightTheme;
  console.log('-----', theme);

  return (
    <Header style={{ background: theme.bgColor, color: theme.color }}>
      <CDBNavbar dark expand="md" scrolling className="justify-content-start">
        <CDBInput type="search" size="md" hint="Search" className="mb-n4 mt-n3 input-nav" />
        <div className="ml-auto">
          <i className="fas fa-bell"></i>
          <i className="fas fa-comment-alt mx-4"></i>
          <img alt="panelImage" src="img/pane/pane4.png" style={{ width: "3rem", height: "3rem" }} />
        </div>
      </CDBNavbar>
    </Header>
  );
}

export default Navbar;
