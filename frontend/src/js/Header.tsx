// Header.tsx
// Implements the header sitewide

import React from "react";
import * as Router from 'react-router-dom';

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Button from '@material-ui/core/Button';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";


export default function Header(): JSX.Element {
    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    <CollectionsBookmarkIcon />
                </Typography>
                <Button component={Router.Link} to="/signin" color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}
