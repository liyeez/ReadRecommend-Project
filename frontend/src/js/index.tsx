// index.tsx
// Main entrypoint for app
// Handles routing for the different pages

import React from "react";
import ReactDOM from 'react-dom';
import * as Router from "react-router-dom";

// Page imports
import Header from "./Header";
import Footer from "./Footer";
import Main from "./main";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import UserLibrary from "./UserLibrary";
import UserCollections from "./UserCollections";

const routing: JSX.Element =
    <Router.BrowserRouter>
        <Header />
        <div>
            {/* Matches URL to first in the list and places the result in the div*/}
            <Router.Switch>
                <Router.Route path="/auth/signup">
                    <SignUp />
                </Router.Route>
                <Router.Route path="/auth/signin">
                    <SignIn />
                </Router.Route>
                <Router.Route path="/user/userlibrary">
                    <UserLibrary />
                </Router.Route>
                <Router.Route path="/user/usercollections">
                    <UserCollections />
                </Router.Route>
                <Router.Route path="/">
                    <Main />
                </Router.Route>
            </Router.Switch>
        </div>
        <Footer />
    </Router.BrowserRouter>;

ReactDOM.render(routing, document.getElementById("main"));
