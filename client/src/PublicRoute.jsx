import React, {useContext, useState, useEffect} from "react";
import {UserContext} from './store';
import {Route, Redirect} from 'react-router-dom';
import {setAccessToken} from './accessToken';

const PublicRoute = ({ component: Component, ...rest }) => {
    const {state, dispatch} = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch("http://localhost:4000/refresh_token", {
        method: "POST",
        credentials: "include"
      }).then(async x => {
        const res = await x.json();
        setAccessToken(res.accessToken);
        if(res.accessToken){
          dispatch({type: 'LOGIN_USER', payload: res.user})
        }
        setLoading(false);
      });
    }, []);
  
    if (loading) {
      return <div>loading...</div>;
    }

    return (
        <Route
        {...rest}
        render={(props) =>
          state.isLogged ? (
            <Redirect
            to={{
              pathname: "/home",
            }}
          />
          ) : (
            <Component {...props} />
          )
        }
      />
    )
}

export default PublicRoute;
