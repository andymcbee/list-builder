import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomePage } from "./views/HomePage/HomePage";
import Signin from "./views/Signin/Signin";
import Signup from "./views/Signup/Signup";

import Header from "./components/header/Header";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <div className="container">
          <Header />

          <Routes>
            <Route path="/" element={user ? <HomePage /> : <Signin />} />
            <Route path="/signin" element={user ? <HomePage /> : <Signin />} />
            <Route path="/signup" element={user ? <HomePage /> : <Signup />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
