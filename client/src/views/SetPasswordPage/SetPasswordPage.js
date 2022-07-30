import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Link } from "react-router-dom";

///reset-password/send-email

const theme = createTheme();

export default function SetPasswordPage() {
  const [email, setEmail] = useState("");

  const sendPasswordResetEmail = async () => {
    console.log("PASSWORD RESET FUNCTION TRIGGERED");
    const body = {
      email,
    };

    try {
      const { data } = await axios.post(
        "/api/users/reset-password/send-email",
        body
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("SUBMIT FIRED");

    let formData = { email };
    sendPasswordResetEmail(formData);
    // dispatch API call.
    //   await resetPassword(formData);
    setEmail("");
    console.log("Fired after reset PW trigger in view component)");
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SET PASSWORD
          </Typography>
          <Box component="form" validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <input
                  required
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Reset Link
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Back to login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
