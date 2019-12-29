/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// Important react import
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Navbar from "./components/Navbar";
import HomPage from "./pages/HomePage";
import {HashRouter, Route, Switch, withRouter} from "react-router-dom";
import CustomersPage from "./pages/CustomerPage";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import AuthorizationAPI from "./services/authorizationAPI";
import AuthenticationContext from "./contexts/AuthenticationContext";
import PrivateRoute from "./components/PrivateRoute";

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.scss');
require('bootstrap');

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
const $ = require('jquery');

$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
});

AuthorizationAPI.setup();

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthorizationAPI.isAuthenticated());
    const NavbarWithRouter = withRouter(Navbar);

    return (
        <AuthenticationContext.Provider value={{
            isAuthenticated: isAuthenticated,
            setIsAuthenticated: setIsAuthenticated
        }}>
            <HashRouter>
                <NavbarWithRouter/>
                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <PrivateRoute path={"/invoices"} component={InvoicesPage}/>
                        <PrivateRoute path={"/customers"} component={CustomersPage}/>
                        <Route path="/" component={HomPage}/>
                    </Switch>
                </main>
            </HashRouter>
        </AuthenticationContext.Provider>
    );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App/>, rootElement);
