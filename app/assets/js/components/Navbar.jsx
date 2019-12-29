import React, {useContext} from 'react';
import AuthorizationAPI from "../services/authorizationAPI";
import {NavLink} from "react-router-dom";
import AuthenticationContext from "../contexts/AuthenticationContext";

const Navbar = ({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthenticationContext);

    const handleLogout = () => {
        AuthorizationAPI.logout();
        setIsAuthenticated(false);
        history.push('/login')
    };

    return (
        <header>
            <nav className="container shadow-sm rounded navbar navbar-expand-lg navbar-light bg-white mt-4">
                <NavLink className="navbar-brand" to="/">Navbar</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"> </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/customers">Customers <span
                                className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/invoices">Invoices</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {(!isAuthenticated && (
                            <>
                                <li className="nav-item active">
                                    <NavLink className="nav-link" to="/register">Sign up</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Sign in</NavLink>
                                </li>
                            </>
                        )) || (
                            <li className="nav-item">
                                <button className="nav-link btn btn-light bg-white" onClick={handleLogout}>Log out
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;