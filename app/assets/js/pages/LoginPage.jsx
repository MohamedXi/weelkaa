import React, {useState, useContext} from 'react';
import AuthorizationAPI from "../services/authorizationAPI";
import AuthenticationContext from "../contexts/AuthenticationContext";

const LoginPage = ({history}) => {

    const {setIsAuthenticated} = useContext(AuthenticationContext);

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    // Handle the input fields
    const handleChangeValue = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]: value});
    };

    // Handle the submit form
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await AuthorizationAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            history.replace("/customers");
        } catch (e) {
            setError("No email address corresponds to the one entered");
        }
    };

    return (
        <React.Fragment>
            <h1>Login page</h1>
            <form className="form-signin" onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                    <h1 className="h3 mb-3 font-weight-normal">Floating labels</h1>
                    <p>Build form controls with floating labels via
                        the <code>:placeholder-shown</code> pseudo-element. <a
                            href="https://caniuse.com/#feat=css-placeholder-shown">Works in latest Chrome, Safari,
                            and Firefox.</a></p>
                </div>

                <div className="form-label-group">
                    <input
                        type="email"
                        id="username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChangeValue}
                        className="form-control"
                        placeholder="Email address"
                        required=""
                        autoFocus=""/>
                    <label htmlFor="username">Email address</label>
                </div>

                <div className="form-label-group">
                    <input type="password" id="password" name="password" value={credentials.password}
                           onChange={handleChangeValue}
                           className="form-control" placeholder="Password"
                           required=""/>
                    <label htmlFor="password">Password</label>
                </div>

                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                {error && <div className="alert alert-danger mt-4" role="alert">
                    <i className="fal fa-exclamation-triangle"></i> The username or password is incorrect.
                </div>}
                <p className="mt-5 mb-3 text-muted text-center">© 2017-2019</p>
            </form>
        </React.Fragment>
    );
};

export default LoginPage