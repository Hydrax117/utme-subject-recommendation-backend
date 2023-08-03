import { useState } from "react";
import "../forms/login.css";
import { Form, Btn, ErrorMsg, ErrorMsgContainer, TxtField } from "../form";
import { Route, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";
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
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState();

  const navigate = useNavigate();

  function Index() {
    setTimeout(() => {
      // 👇 Redirects to about page, note the `replace: true`
      navigate("/", { replace: true });
    }, 3000);
  }

  const handleSubmit = async (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    event.preventDefault();
    if (`${email}` === "" || `${password}` === "") {
      document.getElementById("errorContainer").style.display = "block";
      document.getElementById("error").innerHTML = "* please fill in the above";
      // document
      //   .getElementById("error")
      //   .insertAdjacentHTML("beforeend", "<div><h1> Hello world</h1></div>");
    } else {
      if (`${email}`.includes("@")) {
        // fetch("http://localhost:4000/login", requestOptions)
        //   .then((response) => response.json())
        //   .then((result) => {
        //     if (result.data["email"] == email) {
        //       setUser(response)
        //       Index();
        //     }
        //   })
        //   .catch((error) => console.log("s error", setError(error.message)));
        const user = { email, password };
        const response = await axios.post("http://localhost:4000/login", user);
        if (response.data.status === 200) {
          // store the user in localStorage
          window.localStorage.setItem("user", response.data.data.email);
          window.localStorage.setItem("isLoggin", true);
          window.localStorage.setItem("Token", response.data.data.token);

          console.log(response.data.data);
        } else {
          console.log(response.data.message);
        }
      }
    }
  };

  return (
    <>
      <div className="container">
        <Form class="form">
          <div class="login">
            <TxtField
              className="txt"
              label="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                document.getElementById("errorContainer").style.display =
                  "none";
              }}
            />
            <br /> <br />
            <TxtField
              className="txt"
              label="password"
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
              <ErrorMsg id="error">something happed</ErrorMsg>
            </ErrorMsgContainer>
            <br /> <br />
            <Btn onClick={handleSubmit}>Submit</Btn>
          </div>
          <br />
          <p>
            don't have an account? <br /> click
            <NavLink to="/register">here</NavLink>
            to signup.
          </p>
        </Form>
      </div>
    </>
  );
};
