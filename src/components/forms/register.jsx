import { useState } from "react";
import { useEffect } from "react";

import { Form, ErrorMsg, ErrorMsgContainer, Btn, TxtField } from "../form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Route, useNavigate } from "react-router-dom";

export const NavLink = styled(Link)`
  color: blue;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #000000;
  }
`;
const Msgbox = styled.div`
  height: 50px;
  background-color: white;
  border: 1px solid green;
  padding: 10px;
  width: 98%;
  text-align: center;
  align-items: center;
`;
const Message = styled.label`
  color: green;
`;
export const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  function Index() {
    setTimeout(() => {
      // 👇 Redirects to about page, note the `replace: true`
      navigate("/login", { replace: true });
    }, 3000);
  }

  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    event.preventDefault();
    if (`${password}` === "" || `${email}` === "") {
      document.getElementById("errorContainer").style.display = "block";
      document.getElementById("error").innerHTML = "* please fill in the above";
    } else {
      fetch("http://localhost:4000/add-candidate", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.data["email"] == email) {
            setMessage("Registration SuccessFull!!");

            Index();
          }
        })
        .catch((error) => console.log("s error", setError(error.message)));
    }
  };

  return (
    <>
      <div className="container">
        <Form>
          <div class="login">
            <Msgbox>
              <Message>{message}</Message>
            </Msgbox>{" "}
            <br />
            <TxtField
              className="txt"
              label="Email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                document.getElementById("errorContainer").style.display =
                  "none";
              }}
            />{" "}
            <br />
            <br />
            <TxtField
              className="txt"
              label="First Name"
              name="first_name"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                document.getElementById("errorContainer").style.display =
                  "none";
              }}
            />
            <br /> <br />
            <TxtField
              className="txt"
              label="Middle Name(optional)"
              name="middleName"
              type="text"
              value={middleName}
              onChange={(e) => {
                setMiddleName(e.target.value);
                document.getElementById("errorContainer").style.display =
                  "none";
              }}
            />
            <br /> <br />
            <TxtField
              className="txt"
              label="Last name"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                document.getElementById("errorContainer").style.display =
                  "none";
              }}
            />
            <br /> <br />
            <TxtField
              className="txt"
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                document.getElementById("errorContainer").style.display =
                  "none";
              }}
            />
            <br /> <br />
            <ErrorMsgContainer id="errorContainer">
              <ErrorMsg id="error"> </ErrorMsg>
            </ErrorMsgContainer>
            <br /> <br />
            <Btn onClick={handleSubmit}>Submit</Btn>
            <br /> <br />
            <p>
              already have an account? <br /> click
              <NavLink to="/login">here</NavLink>
              to login.
            </p>
          </div>
        </Form>
      </div>
    </>
  );
};
