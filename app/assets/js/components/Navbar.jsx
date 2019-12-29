import React from 'react';

const Navbar = (props) => {
    return (
        <header>
            <nav className="container shadow-sm rounded navbar navbar-expand-lg navbar-light bg-white mt-4">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Customers <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Invoices</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Sign up</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Sign in</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Log out</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;