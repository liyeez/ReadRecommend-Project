// UserLibary.tsx
// User Libary page

import React, { ChangeEvent, useState } from "react";
import * as $ from "jquery";
import * as Router from "react-router-dom";

import CookieService from "../services/CookieService";
// Material UI
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

declare const API_URL: string;

const Style = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    cardMedia: {
        paddingTop: "56.25%", // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

let readStatus : any[] = [];

export default function UserLibrary() {
    const classes = Style();
    const token = CookieService.get("access_token");

    const [libraryReadStatuses, setLibraryReadStatuses] = useState<boolean[]>([]);
    const [statusChanged, setStatusChanged] = useState<boolean>(false);

    let cards: Array<any> = [];

    function removeBook(id) {
        var data = removeLib(id, function (data) {
            if (data != null) {
                if (data.message == "Book removed from library") {
                    window.location.href = "/user/userlibrary";
                } else {
                    alert("No Matched Results!");
                    window.location.href = "/";
                }
            }
        });
    }

    function removeLib(id, callback) {
        $.ajax({
            async: false,
            url: API_URL + "/api/collections/delete_from_library",
            data: {
                auth: token,
                id: id,
            },
            method: "POST",
            success: function (data) {
                if (data != null) {
                    callback(data);
                }
                callback(null);
            },
            error: function () {
                console.log("server error!");
                callback(null);
            },
        });
    }

    function request() {
        var data = onSearch(function (data) {
            if (data != null) {
                if (data.message == "Got user library") {
                    cards = data.book_list;
                } else {
                    alert("No Matched Results!");
                    window.location.href = "/";
                }
            }
        });
    }

    function onSearch(callback) {
        $.ajax({
            async: false,
            url: API_URL + "/api/user/get_library",
            data: {
                auth: token,
            },
            method: "GET",
            success: function (data) {
                if (data != null) {
                    callback(data);
                }
                callback(null);
            },
            error: function () {
                console.log("server error!");
                callback(null);
            },
        });
    }

    function initialiseReadStatus(bookId) : boolean {
        let status = false;
        var data = getReadStatus(bookId, function (data) {
            status = data.is_read;
        });
        return status;
    }

    function getReadStatus(bookId, callback) {
        $.ajax({
            async: false,
            url: API_URL + "/api/books/is_read",
            data: {
                auth: token,
                book_id: bookId
            }, 
            method: "GET",
            success: function (data) {
                if (data != null) {
                    console.log(data.is_read);
                    callback(data);
                } else {
                    callback(null);
                }
            },
            error: function() {
                console.log("server error!");
                callback(null);
            }
        })
    }

    // Toggles the read status of a book in a user's library between read and unread.
    function toggleRead(bookId) {
        var data = setReadStatus(bookId, function (data) {
            setStatusChanged(!statusChanged);
        });
    }

    function setReadStatus(bookId, callback) {
        $.ajax({
            async: false,
            url: API_URL + "/api/books/set_read",
            data: {
                auth: token,
                book_id: bookId,
            },
            method: "POST",
            success: function (data) {
                if (data != null) {
                    console.log(data.message);
                    callback(data);
                } else {
                    callback(null);
                }
            },
            error: function() {
                console.log("server error!");
                callback(null);
            }
        })
    }

    request();

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Page Title and Main Action For Title */}
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary">My Library</Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button component={Router.Link} to="/" type="submit" variant="contained" color="primary" startIcon={<AddIcon />}>
                                        Find More Books
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>

                {/* User's Libary Books */}
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card.id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia className={classes.cardMedia} image="https://source.unsplash.com/random" title="Image title"/>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.book_title}
                                        </Typography>
                                        {/* Switch To Display Read Status of Book */}
                                        <FormGroup row>
                                            <FormControlLabel control={<Switch checked={initialiseReadStatus(card.id)} onChange={() => toggleRead(card.id)} color="primary"/>} label="Read Status"/>
                                        </FormGroup>
                                        <Typography>By Author: {card.book_author}</Typography>
                                        <Typography>Published on: {card.book_pub_date}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button component={Router.Link} to={"/bookdata/metadata?id=" + card.id} size="small" color="primary">View</Button>
                                        <Button size="small" color="primary" onClick={() => removeBook(card.id)}>Remove</Button>
                                        <Button size="small" color="primary">Move to Collection</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}
