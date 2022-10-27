import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useSelector } from "react-redux";
function Navbar() {
  const { logout, error, isPending } = useLogout();
  const user = useSelector((state) => state.auth.user);
  return (
    <nav className="navbar">
      <h1 className="title">react-firebase-rtk-SCSS auth-db template</h1>
      <ul>
        {!user && (
          <React.Fragment>
            <li>
              <Link replace={true} to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link replace={true} to="/signup">
                Signup
              </Link>
            </li>
          </React.Fragment>
        )}{" "}
        {user && (
          <li>
          <span>hello, {user.displayName}</span>
            <button
              className="btn"
              onClick={() => {
                logout();
              }}
            >
              Log Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
