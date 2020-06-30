// UserLibary.tsx
// User Libary page

import * as $ from "jquery";
import React, {ChangeEvent, useState} from "react";
import * as Router from "react-router-dom";

import CookieService from "../services/CookieService";
// Material UI
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Link from "@material-ui/core/Link";
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from "@material-ui/core/styles";

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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

function viewBook(data){
    window.location.href="/bookdata/metadata?isbn="+data;
}

// TODO AFTER API IMPLEMENTED
function removeBook(data){
    //window.location.href="/bookdata/metadata?isbn="+data;
}

export default function UserLibrary() {
    const classes = Style();
    const token = CookieService.get('access_token');

    let cards: Array<any> =[];
    function request() {
        var data = onSearch(function(data){
            console.log(data)
            if (data != null) {
                if (data.message == "Got user library") {
                    cards = data.book_list;
                    //console.log(cards[0].book_title);
                } else{
                    alert("No Matched Results!");
                    window.location.href='/';
                }
            }
        });
    }

    function onSearch(callback) {
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/user/get_library",
            data: {
                auth: token,
            },
            method: "GET",
            success: function (data) {
                console.log(data);
                if(data!= null) {
                    callback(data);
                }
                callback(null);
            },
            error: function () {
                console.log("server error!");
                callback(null);
            }
        });
    }

    request();
    return (
        <React.Fragment>
            <CssBaseline />

            <main>
            {/* Hero unit */}
            <div className={classes.heroContent}>
                <Container maxWidth="md">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" >
                        My Library
                    </Typography>
                    <div className={classes.heroButtons}>
                        <Grid container spacing={2} justify="center">
                            <Grid item>
                                <Button
                                    component={Router.Link} to="/"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon/>}
                                >
                                    Find More Books
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
                <Grid container spacing={4}>
                    {cards.map((card) => (
                        <Grid item key={card.isbn} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image="https://source.unsplash.com/random"
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {card.book_title}
                                    </Typography>

                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={() => viewBook(card.isbn)}>
                                        View
                                    </Button>
                                    <Button size="small" color="primary" endIcon={<DeleteIcon/>} onClick={() => removeBook(card.isbn)}>
                                        Remove
                                    </Button>
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
