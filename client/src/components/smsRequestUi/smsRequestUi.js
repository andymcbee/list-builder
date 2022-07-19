import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SmsIcon from "@mui/icons-material/Sms";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { reset } from "../../features/auth/authSlice";
import Spinner from "../../components/spinner/Spinner";

const theme = createTheme();

export default function UserSignin() {
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      //   toast.error(message);
      //show a success message here
    }

    dispatch(reset());
  }, [user, message, isError, isSuccess, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    //let formData = { email, password };
    // dispatch(signin(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }

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
            <SmsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Send Request
          </Typography>
          <Box component="form" validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  type="phone"
                  autoComplete="phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Request
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
