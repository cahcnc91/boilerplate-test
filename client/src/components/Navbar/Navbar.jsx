import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {UserContext} from '../../store';
import {useLogoutMutation} from '../../generated/types.d';
import {setAccessToken} from '../../accessToken'

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const [logout] = useLogoutMutation();

  let isLoggedOptions = null;

  if (state.isLogged) {
    isLoggedOptions = (
      <div style={{display: "flex"}}>
        <p style={{paddingRight: '1rem'}}>{state.currentUser.email}</p>
        <button onClick={() => {
          dispatch({type: "LOGOUT_USER"});
          logout();
          setAccessToken("")
        }}>Logout</button>
      </div>
    );
  } else {
    isLoggedOptions = <Link to="/login">Login</Link>;
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{display: "flex", justifyContent: "space-between"}}>
        <div>
          <Link to="/home" className="navbar-brand">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{flexGrow: "unset"}}
        >
          <ul
            className="navbar-nav mr-auto"
          >
            <li className="nav-item active">
              {state.isLogged? null : <Link to="/register" className="nav-link">
                Register
              </Link>}
            </li>
            <li className="nav-link">{isLoggedOptions}</li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
