/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// Important react import
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from "./components/Navbar";
import HomPage from "./pages/HomePage";
import {HashRouter, Route, Switch} from "react-router-dom";
import CustomersPage from "./pages/CustomerPage";
import InvoicesPage from "./pages/InvoicesPage";

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.scss');
require('bootstrap');

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
const $ = require('jquery');

$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
});

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');

const App = () => {
    return (
        <HashRouter>
            <Navbar/>
            <main className="container pt-5">
                <Switch>
                    <Route path="/invoices" component={InvoicesPage}/>
                    <Route path="/customers" component={CustomersPage}/>
                    <Route path="/" component={HomPage}/>
                </Switch>
            </main>
        </HashRouter>
    );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App/>, rootElement);
