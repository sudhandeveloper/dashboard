import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

import Profile from "../avatar-components/Profile";
import "react-image-crop/dist/ReactCrop.css";

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    profileimage: "",
  });

  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
    emailExists: false,
  });

  const handleProfileImageChange = (newValue) => {
    setInput({ ...input, profileimage: newValue });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      firstname: false,
      lastname: false,
      email: false,
      password: false,
      emailExists: false,
    });

    // Validate all fields
    const { firstname, lastname, email, password } = input;
    if (!firstname || !lastname || !email || !password) {
      setErrors((prevErrors) => ({ ...prevErrors, ...{ firstname: !firstname, lastname: !lastname, email: !email, password: !password } }));
      return;
    }

    // Check if the email already exists in local storage
    const existingUsers = Object.keys(localStorage).filter((key) =>
      key.startsWith("user_")
    );
    const existingEmail = existingUsers.some((key) => {
      const userData = JSON.parse(localStorage.getItem(key));
      return userData.email === email;
    });

    if (existingEmail) {
      setErrors((prevErrors) => ({ ...prevErrors, emailExists: true }));
      return;
    }

    // Proceed with creating a new user account
    const userId = Date.now(); // Generate a unique ID for the user
    const userData = { ...input, id: userId };
    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
    navigate("/");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Profile
            value={input.profileimage}
            name={"profileimage"}
            onChange={handleProfileImageChange}
          />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={input.firstname}
                  onChange={(e) =>
                    setInput({ ...input, firstname: e.target.value })
                  }
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  error={errors.firstname}
                  helperText={errors.firstname && "First name is required"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  value={input.lastname}
                  onChange={(e) =>
                    setInput({ ...input, lastname: e.target.value })
                  }
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  error={errors.lastname}
                  helperText={errors.lastname && "Last name is required"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={input.email}
                  fullWidth
                  onChange={(e) =>
                    setInput({ ...input, email: e.target.value })
                  }
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={errors.email || errors.emailExists}
                  helperText={(errors.email && "Email is required") || (errors.emailExists && "Email already exists")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={(e) =>
                    setInput({ ...input, password: e.target.value })
                  }
                  value={input.password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={errors.password}
                  helperText={errors.password && "Password is required"}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}














// setbooks([...employeeData, books]);