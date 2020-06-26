// Sidebar.tsx
// User sidebar which is rendered when a user is signed in.
import React from "react";
import * as Router from 'react-router-dom';

// Material UI
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

const drawerWidth = 240;

const Style = makeStyles((theme) => ({
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

const Sidebar: React.FC = ({}) => {
    const classes = Style();
    return (
        <div>
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
                        <ListItem button key={'My Library'} component={Router.Link} to="/users/userlibrary">
                        <ListItemIcon><LocalLibraryIcon /></ListItemIcon>
                        <ListItemText primary={'My Library'} />
                        </ListItem>
                        <ListItem button key={"My Collections"} component={Router.Link} to="/users/usercollections">
                        <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
                        <ListItemText primary={'My Collections'} />
                        </ListItem>
                        <ListItem button key={'Find Users'}>
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary={'Find Users'} />
                        </ListItem>

                        <ListItem button key={"My Profile"} component={Router.Link} to="/user/profile">
                        <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
                        <ListItemText primary={'My Profile'} />
                        </ListItem>
                        {/* For testing purposes. Prints Signed In if userSignedIn property is true. */}
                        {/*(userSignedIn) ? (<p>Signed In</p>) : (<p>Signed Out</p>)*/}
                    </List>
                </div>
            </Drawer>
        </div>
    );
}

export default Sidebar;
