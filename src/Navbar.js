import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CDBNavbar, CDBInput } from "cdbreact";

import { Header } from "./Navbar.style";
import { removeLoggedInUser } from "./store/actions/auth.action";
import { toggleTheme } from "./store/slice/themeSlice";


const Navbar = () => {
  const dispatch = useDispatch();
  const { darkMode, lightTheme, darkTheme } = useSelector(state => state.theme);
  let themeMode = darkMode ? darkTheme : lightTheme;

  const handleThemeToggle = (e) => {
    e.preventDefault();
    dispatch(toggleTheme());
  };

  const handleLogout = (e) => {
    e.preventDefault();
    removeLoggedInUser();

  };

  return (
    <Header style={{ background: themeMode.bgColor, color: themeMode.color }}>
      <CDBNavbar dark expand="md" scrolling className="justify-content-start">
        {/* <CDBInput type="search" size="md" hint="Search" className="mb-n4 mt-n3 input-nav" /> */}
        <div className="ml-auto">
          <i className={`${darkMode ? "zmdi zmdi-brightness-5" : "zmdi zmdi-brightness-6"}`} onClick={handleThemeToggle} style={{ fontSize: '30px' }}></i>
          <i className="zmdi zmdi-power mx-3" onClick={handleLogout} style={{ marginTop: '10px', fontSize: '35px' }}></i>
          {/* <img alt="panelImage" src="img/pane/pane4.png" style={{ width: "3rem", height: "3rem" }} /> */}
        </div>
      </CDBNavbar>
    </Header>
  );
}

export default Navbar;