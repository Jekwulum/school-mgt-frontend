import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem
} from "cdbreact";

const Sidebar = () => {
  const { darkMode, lightTheme, darkTheme } = useSelector(state => state.theme);
  const themeMode = darkMode ? darkTheme : lightTheme;

  let iconMarginLeft = "8px";

  return (
    <div
      className={`app`}
      style={{ display: "flex", height: "100%", overflow: "scroll initial" }}>
      <CDBSidebar textColor={themeMode.color} backgroundColor={themeMode.bgColor}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: "inherit" }}>
            <i>mySchool</i>
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">
                dashboard
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">
                tables
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/students" activeClassName="activeClicked">
              <CDBSidebarMenuItem>
                <i className="zmdi zmdi-graduation-cap" style={{ fontSize: "22px" }}></i>
                <span style={{ marginLeft: iconMarginLeft }}>students</span>
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/staff" activeClassName="activeClicked">
              <CDBSidebarMenuItem>
                <i className="zmdi zmdi-accounts-list" style={{ fontSize: "22px" }}></i>
                <span style={{ marginLeft: iconMarginLeft }}>Staff</span>
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">
                profile
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">
                404 page
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
          <CDBSidebarMenu>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default Sidebar;
