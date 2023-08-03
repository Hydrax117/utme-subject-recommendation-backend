import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="menu">
        <li>
          <Link to="/user/dashboard">Profile</Link>
        </li>
        <li>
          <Link to="/Subject-combination">Subject Combination</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};
export const SidebarContainer = styled.div`
  margin-left: 250px;
`;
export default Sidebar;
