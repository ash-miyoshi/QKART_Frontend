import { Warning } from "@mui/icons-material";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import { useHistory, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassord] = useState("");
  const [loader, setLoader] = useState(false);

  let history = useHistory();

  const handleChangeUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassord(event.target.value);
  };

  const resetForm = () => {
    setUserName("");
    setPassword("");
    setConfirmPassord("");
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function

  
// import { useHistory, Link } from "react-router-dom";

// const Register = () => {
//   const { enqueueSnackbar } = useSnackbar();


  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    try {
      setLoader(true);
      const response = await axios.post(
        config.endpoint + "/auth/register",
        formData
      );

      if (response.data.success) {
        setLoader(false);
        enqueueSnackbar("Registered successfully", { variant: "success" });
        history.push("/login");
      }
    } catch (err) {
      const errorMessage =
        err.response && err.response.status === 400
          ? err.response.data.message
          : "Something went wrong. Check that the backend is running, reachable and returns valid JSON";

      setLoader(false);
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
    resetForm();
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    if (username === "") {
      enqueueSnackbar("Username is a required field", { variant: "Warning" });
    } else if (username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", {
        variant: "Warning",
      });
    } else if (password === "") {
      enqueueSnackbar("Password is a required field", { variant: "Warning" });
    } else if (password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "Warning",
      });
    } else if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", {
        variant: "Warning",
      });
    } else {
      data = {
        username: username,
        password: password,
      };
      register(data);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={username}
            onChange={handleChangeUserName}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={password}
            onChange={handleChangePassword}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
          />
          {!loader && (
            <Button
              className="button"
              variant="contained"
              onClick={validateInput}
            >
              Register Now
            </Button>
          )}

          {loader && (
            <Box className="loader-box">
              <CircularProgress />
            </Box>
          )}

          <p className="secondary-action">
            Already have an account?{" "}
            <Link className="link" to="/login">Login here</Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
