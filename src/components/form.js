import React, { useContext } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";

export const TxtField = styled(TextField)`
  width: 95%;
  @media only screen and (max-width: 1000px) {
    color: red;
    width: 100%;
  }
`;
export const Form = styled.div`
  width: 40%;
  margin: 4% 27%;
  text-align: center;
  height: auto;
  padding: 40px;
  background: white;
  box-shadow: 1px 2px 2px 2px;
  @media only screen and (max-width: 1000px) {
    width: 100%;
    padding: 40px;
    margin: 10% 0;
    border-radius: 0;
  }
`;

export const ErrorMsgContainer = styled.div`
  height: 32px;
  background: white;
  border: 2px solid white;
  display: none;
`;
export const ErrorMsg = styled.p`
  text-align: center;
  color: red;
`;
export const Btn = styled.label`
  background: green;
  cursor: pointer;
  text-align: center;
  padding: 16px;
  border-radius: 16px 16px;
  width: 100px;
  height: 60px;
  color: white;
`;
