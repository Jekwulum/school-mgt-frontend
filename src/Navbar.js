import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CDBNavbar, CDBInput } from "cdbreact";

import { Header } from "./Navbar.style";
import { toggleTheme } from "./store/slice/themeSlice";


const Navbar = () => {
  const dispatch = useDispatch();
  const { darkMode, lightTheme, darkTheme } = useSelector(state => state.theme);
  let themeMode = darkMode ? darkTheme : lightTheme;
  console.log('-----', themeMode);

  const handleThemeToggle = (e) => {
    e.preventDefault();
    dispatch(toggleTheme());
  };

  return (
    <Header style={{ background: themeMode.bgColor, color: themeMode.color }}>
      <CDBNavbar dark expand="md" scrolling className="justify-content-start">
        <CDBInput type="search" size="md" hint="Search" className="mb-n4 mt-n3 input-nav" />
        <div className="ml-auto">
          <i className={`${darkMode ? "fas fa-sun" : "fas fa-adjust"}`} onClick={handleThemeToggle} style={{ margin: '10px', fontSize: '30px' }}></i>
          <i className="fas fa-bell" style={{ margin: '10px', fontSize: '30px' }}></i>
          <i className="fas fa-comment-alt mx-3" style={{ margin: '10px', fontSize: '30px' }}></i>
          <img alt="panelImage" src="img/pane/pane4.png" style={{ width: "3rem", height: "3rem" }} />
        </div>
      </CDBNavbar>
    </Header>
  );
}

export default Navbar;