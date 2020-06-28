// Header.tsx
// Implements the header sitewide

import $ = require('jquery');
import React from "react";
import * as Router from 'react-router-dom';
import CookieService from "../services/CookieService";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Button from '@material-ui/core/Button';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import Drawer from '@material-ui/core/Drawer';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import PeopleIcon from '@material-ui/icons/People';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

// Page imports
import Sidebar from "./Sidebar";

const userSignedIn = false;
const drawerWidth = 240;

const Style = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
}));

function handleLogout() {
    const tokenToRemove = CookieService.get('access_token')

    // Remove cookie on backend.
    $.ajax({
        url: "http://localhost:8000/api/auth/signout",
        method: "POST",
        data: {
            token: tokenToRemove,
        },
        success: function (data) {
            console.log("Logged out");
        },
        error: function () {
            console.log("server error!");
        }
    });

    // Remove 'access_token' cookie on frontend using CookieService.
    CookieService.remove('access_token');
    window.location.reload();
}

interface Props {
    userSignedIn: boolean;
}

const Header: React.FC<Props> = ({userSignedIn} : Props) => {
    const classes = Style();
    // Determine whether a user is signed in by checking for 'access_token' cookie.
    const token = CookieService.get('access_token')

    if (token) {
        userSignedIn = true;
    } else {
        userSignedIn = false;
    }

    return (
        <div>
            <AppBar position="relative" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        <Button component={Router.Link} to="/" color="inherit" startIcon={<CollectionsBookmarkIcon />}/>
                    </Typography>
                    {/* Renders Login button if user not signed in, otherwise reders Logout button.*/}
                    {(userSignedIn) ? (<Button component={Router.Link} to="/auth/signout" color="inherit" onClick={handleLogout}>Logout</Button>)
                                    : (<Button component={Router.Link} to="/auth/signin" color="inherit">Login</Button>)}

                </Toolbar>
            </AppBar>

            {/* Renders sidebar only if user is signed in */}
            {(userSignedIn) ? (<Sidebar />) : (null)}
        </div>
    )
}

export default Header;
