// Header.tsx
// Implements the header sitewide

import React from "react";
import * as Router from 'react-router-dom';

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Button from '@material-ui/core/Button';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
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

const drawerWidth = 240;

const Style = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}));

export default function Header(): JSX.Element {
    const classes = Style();
    return (
        <div>
            <AppBar position="relative" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        <CollectionsBookmarkIcon />
                    </Typography>
                    <Button component={Router.Link} to="/signin" color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper,
                }}
            >
            <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem button key={'My Library'}>
                        <ListItemIcon><LocalLibraryIcon /></ListItemIcon>
                        <ListItemText primary={'My Library'} />
                        </ListItem>
                        <ListItem button key={'My Collections'}>
                        <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
                        <ListItemText primary={'My Collections'} />
                        </ListItem>
                        <ListItem button key={'Find Users'}>
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary={'Find Users'} />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    )
}
