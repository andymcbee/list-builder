import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./styles.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">List Builder</Link>
      </div>
      <ul>
        <li>
          <Link to="/signin">
            <FaSignInAlt />
            Login
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <FaUser />
            Signup
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
