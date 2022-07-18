import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomePage } from "./views/HomePage/HomePage";
import Signin from "./views/Signin/Signin";
import Signup from "./views/Signup/Signup";

import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
