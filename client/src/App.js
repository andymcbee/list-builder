import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomePage } from "./views/HomePage/HomePage";
import Signin from "./views/Signin/Signin";
import Signup from "./views/Signup/Signup";
import { SmsInterfacePage } from "./views/SmsInterfacePage/SmsInterfacePage";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, reset } from "./features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "./components/spinner/Spinner";

function App() {
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  let jwtToken = JSON.parse(localStorage.getItem("user"));

  if (!user && jwtToken) {
    dispatch(fetchUser(jwtToken));
  }

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());

    // dispatching the reset before the form data loads is causing a flicker. This will cause an issue
    // dispatch(reset());
  }, [user, message, isError, isSuccess, dispatch, isLoading, jwtToken]);

  if (!isLoading) {
    return (
      <>
        <Router>
          <div className="container">
            <Routes>
              <Route path="/" element={user ? <HomePage /> : <Signin />} />
              <Route
                path="/signin"
                element={user ? <HomePage /> : <Signin />}
              />
              <Route
                path="/signup"
                element={user ? <HomePage /> : <Signup />}
              />
              <Route path="/send/:pageId" element={<SmsInterfacePage />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer />
      </>
    );
  }
}

export default App;
