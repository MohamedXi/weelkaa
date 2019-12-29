import AuthenticationContext from "../contexts/AuthenticationContext";
import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom"

const PrivateRoute = ({path, component}) => {
    const {isAuthenticated} = useContext(AuthenticationContext);
    return isAuthenticated ? <Route path={path} component={component}/> : <Redirect to={"/login"}/>;
};

export default PrivateRoute;