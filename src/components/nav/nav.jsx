import "./nav.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavLink = styled(Link)`
  color: white;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #000000;
  }
`;
export const NavBar = () => {
  const isLoggedin = window.localStorage.getItem("isLoggin");

  return (
    <div className="Nav">
      <div className="title">
        <p>UTME Subject Recomdation</p>
      </div>
      <ul className="header">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/programs">Programs</NavLink>
        </li>
        {isLoggedin ? (
          <li>
            <NavLink to="/login">Portal</NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </div>
  );
};
