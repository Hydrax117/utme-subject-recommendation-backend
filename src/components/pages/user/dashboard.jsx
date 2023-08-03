import React from "react";
import { useState, useEffect } from "react";

import Sidebar from "../../nav/sidebar";
import styled from "styled-components";
import { SidebarContainer } from "../../nav/sidebar";
const profileImage = require("../../../images/profile.jpg");

const ProfileImage = styled.img`
  height: 240px;
  width: 240px;
  border-radius: 280px 280px;
`;
const ImgContainer = styled.div``;

const Card = styled.div`
  color: grey;
  box-shadow: 1px 2px 2px 2px;
  height: 230px;
`;

const UserDashboard = () => {
  const [user, setUser] = useState();
  const [isLoggedin, setIsLoggedin] = useState("");
  useEffect(() => {
    setUser(window.localStorage.getItem("user"));
    setIsLoggedin(window.localStorage.getItem("isLoggin"));
    // if (loggedInUser) {
    //   const foundUser = JSON.parse(loggedInUser);
    //   setUser(foundUser);
    // }
  }, []);
  return (
    <>
      <Sidebar />
      <SidebarContainer>
        <br />
        <div className="row">
          <div className="col-lg-4">
            <ImgContainer>
              <ProfileImage
                src={profileImage}
                className="img-fluid profile-img"
              />
            </ImgContainer>
          </div>
          <div className="col-lg-6">
            <div className="profile">
              <h6>Name: Ada Ali Adetunji </h6>
              <h6>Email: {user}</h6>
              <h6>Dob: 3/3/2023</h6>
              <h6>Registration Number: ABC123XYZ1</h6>
              <h6>State of Origin: Kaduna</h6>
            </div>
          </div>
        </div>
        <hr />
        <h3>
          <center>Institution Of Study</center>
        </h3>
        <hr />
        <div className="row">
          <div className="col-lg-6">
            <h4>First Choice</h4>
            <p>Type: Degree Awarding</p>
            <p>Institution: Kaduna State University(KASU)</p>
            <p>Faculty: Sciences</p>

            <p>Course: Bsc. Computer Science</p>
          </div>
          <div className="col-lg-6">
            <h4>Second Choice</h4>
            <p>Type: Degree Awarding</p>
            <p>Institution: Federal University Dutse(FUD)</p>
            <p>Faculty: Sciences</p>
            <p>Course: Bsc. Mathematics</p>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-6">
            <h4>Third Choice</h4>
            <p>Type: Degree Awarding</p>
            <p>Institution: Kaduna State Polytechnic</p>
            <p>Faculty: Sciences</p>

            <p>Course: Bsc. Computer Science</p>
          </div>
          <div className="col-lg-6">
            <h4>Fourth Choice</h4>
            <p>Type: Degree Awarding</p>
            <p>Institution: Federal University Dutse(FUD)</p>
            <p>Faculty: Sciences</p>
            <p>Course: ND Mathematics</p>
          </div>
        </div>
      </SidebarContainer>
    </>
  );
};

export default UserDashboard;
