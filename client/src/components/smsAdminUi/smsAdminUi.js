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
import { toast } from "react-toastify";
import Spinner from "../../components/spinner/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";
import { letterSpacing } from "@mui/system";
import { useSelector } from "react-redux";
import { getNativeSelectUtilityClasses } from "@mui/material";

const theme = createTheme();

export default function SmsRequestUi() {
  const [isLoading, setIsLoading] = useState(true);

  const [phone, setPhone] = useState("");
  const [accessAllowed, setAccessAllowed] = useState(false);
  const [messageData, setMessageData] = useState(null);
  const [headline, setHeadline] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messagePageId, setMessagePageId] = useState("");

  const { user } = useSelector((state) => state.auth);

  let jwtToken = JSON.parse(localStorage.getItem("user"));

  const resetPageId = async () => {
    console.log("worked");
    console.log(messagePageId);

    const updateMessageData = async () => {
      const config = {
        headers: { Authorization: `Bearer ${jwtToken}` },
      };

      try {
        const { data } = await axios.post(
          `/api/messages/replacePageId/${messageData._id}`,
          null,
          config
        );

        console.log(data.messageObject.pageId);
        setMessagePageId(data.messageObject.pageId);
      } catch (error) {
        console.log(error);
      }
    };
    updateMessageData();
  };

  const submitUpdatedDetails = async () => {
    console.log(" updated details worked");

    console.log(messageData._id);

    const updateMessageData = async () => {
      const config = {
        headers: { Authorization: `Bearer ${jwtToken}` },
      };

      const body = {
        headline,
        message: messageText,
      };

      try {
        const { data } = await axios.post(
          `/api/messages/update/${messageData._id}`,
          body,
          config
        );
      } catch (error) {
        console.log(error);
      }
    };
    updateMessageData();
  };

  useEffect(() => {
    const getSmsData = async () => {
      const config = {
        headers: { Authorization: `Bearer ${jwtToken}` },
      };

      try {
        const { data } = await axios.get(
          `/api/messages/${user.accountId}`,
          config
        );

        setMessageData(data?.messageObject);
        setHeadline(data?.messageObject.headline);
        setMessageText(data?.messageObject.message);
        setMessagePageId(data?.messageObject.pageId);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getSmsData();
  }, [jwtToken, user.accountId]);
  console.log("message data::::::::::");
  console.log(messageData);

  // console.log(messageData.messageObject.pageId);
  //reset URL flow -- hit a backend API endpoint that updates it, then update page state "page id"

  //construct SMS public page URL
  let root = window.location.protocol + "//" + window.location.host;
  let path = "/send/" + messagePageId;

  const handleSubmit = (event) => {
    event.preventDefault();

    //let formData = { email, password };
    // dispatch(signin(formData));
  };

  /*     if (isLoading) {
    return <Spinner />;
  }  */

  if (!isLoading) {
    return (
      <>
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
                Manage Details{" "}
              </Typography>

              <Box validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <div>{root + path}</div>
                  </Grid>
                  <Grid item xs={3}>
                    <div>
                      <button onClick={resetPageId}>Reset URL</button>
                    </div>
                  </Grid>
                </Grid>

                <Box
                  component="form"
                  validate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="pageHeadlineText"
                        name="pageHeadlineText"
                        type="text"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        multiline
                        rows={4}
                        required
                        fullWidth
                        id="smsMessageText"
                        name="smsMessageText"
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="Update"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={submitUpdatedDetails}
                  >
                    Send Request
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </>
    );
  }
}
