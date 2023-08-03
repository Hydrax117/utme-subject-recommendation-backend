import React from "react";
import { Home } from "./components/home/home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Abt } from "./components/pages/about";
import { NavBar } from "./components/nav/nav";
import { Login } from "./components/forms/login";
import { Register } from "./components/forms/register";
import { Footer } from "./components/footer/footer";
import { SubjectConmination } from "./components/pages/user/subjectCombination";
import UserDashboard from "./components/pages/user/dashboard";
import { useEffect, useState } from "react";
export const App = () => {
  const [user, setUser] = useState();

  const loggedInUser = window.localStorage.getItem("user");
  const isLoggedin = window.localStorage.getItem("isLoggin");
  const foundUser = JSON.stringify(loggedInUser);
  const foundUser1 = JSON.parse(foundUser);

  console.log(isLoggedin);
  console.log(foundUser1);

  // if (loggedInUser) {
  //   const foundUser = JSON.parse(loggedInUser);
  //   setUser(foundUser);
  // }

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" Component={isLoggedin ? UserDashboard : Home} />
          <Route path="/about" Component={Abt}></Route>
          <Route path="/register" Component={Register}></Route>
          <Route path="/login" Component={Login} element={<Login />} />
          <Route
            path="/user/dashboard"
            Component={isLoggedin ? UserDashboard : Login}
          />
          <Route path="/Subject-combination" Component={SubjectConmination} />

          <Route path="/redirect" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
};
