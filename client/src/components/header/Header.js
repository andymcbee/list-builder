import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());

    console.log("Log out clicked");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">List Builder</Link>
      </div>

      {user ? (
        <ul>
          <li>
            <button className="btn" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      ) : (
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
      )}
    </header>
  );
}

export default Header;
