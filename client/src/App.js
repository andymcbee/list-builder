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

  useEffect(() => {
    const fetchUser = async () => {
      let jwtToken = JSON.parse(localStorage.getItem("user"));
      if (!user && jwtToken) {
        await dispatch(fetchUser(jwtToken));
      }
    };

    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [user, message, isError, isSuccess, dispatch, isLoading]);

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
