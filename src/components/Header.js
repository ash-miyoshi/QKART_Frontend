import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory, Link } from "react-router-dom";

const Header = ({ children, hasHiddenAuthButtons }) => {
  let history = useHistory();
  let button;

  const logout = () => {
    history.push("/");
    localStorage.clear();
    window.location.reload();
  };

  if (localStorage.getItem("token") !== null) {
    button = (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Avatar alt={localStorage.getItem("username")} src="avatar.png" />
        <span className="username-text">
          {localStorage.getItem("username")}
        </span>
        <Button
          className="explore-button"
          variant="text"
          onClick={() => logout()}
        >
          LOGOUT
        </Button>
      </Stack>
    );
  } else {
    button = (
      <Stack direction="row" spacing={1}>
        <Button
          className="explore-button"
          variant="text"
          onClick={() => history.push("/login")}
        >
          LOGIN
        </Button>
        <Button variant="contained" onClick={() => history.push("/register")}>
          REGISTER
        </Button>
      </Stack>
    );
  }

  return (
    <Box className="header">
      <Box className="header-title">
        <Link to="/">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Link>
      </Box>
      {hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push("/")}
        >
          Back to explore
        </Button>
      ) : (
        <>
          {children}
          {button}
        </>
      )}
    </Box>
  );
};

export default Header;
