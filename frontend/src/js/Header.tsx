// Header.tsx
// Implements the header sitewide

import React from "react";

// Material UI
import AppBar from "@material-ui/core/AppBar";
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
            </Toolbar>
        </AppBar>
    )
}
