// Main.tsx
// Main page

import $ = require('jquery');
import React, {ChangeEvent, useState} from "react";
import * as Router from 'react-router-dom';
import CookieService from "../services/CookieService";
// Material UI
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from "@material-ui/core/styles";


const Style = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
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
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
}));

interface SearchForm {
    title: string;
}
interface Props {
    userSignedIn: boolean;
}

let flag: boolean;



const Main: React.FC<Props> = ({userSignedIn} : Props) => {

    let cards: any;
    const [SearchForm, setSearchForm] = useState<SearchForm>({
      title: '',
    });

    function addBook(isbn){
        var data = addLib(isbn,function(data){
            if (data != null) {
                console.log(data);
                console.log('added to lib!!');
            } else{
                alert("Something Wrong!");
                window.location.href='/';
            }
        });
    }

    function addLib(isbn, callback) {
        console.log(isbn);
        $.ajax({
            async: false,
            url:"http://localhost:8000/api/collections/add_to_library",
            data: {
                auth: token,
                isbn: isbn,
            },
            method: "POST",
            success: function (data) {
                console.log(data);
                if (data.message == 'Book added to library') {
                    callback(data);
                } else {
                    callback(null);
                }
            },
            error: function () {
                console.log("server error!");
                callback(null);
            }
        });
    }

    const onTextboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchForm(prevSearchForm => {
          return {
            ...prevSearchForm,
            [name]: value,
          };
        });
    }

    function preventDefault(event) {
        window.location.href="/search?title="+SearchForm.title;
    }

    function request() {
        var data = randomBooks(function(data){
            if (data != null) {
                console.log(data);
                cards = data.book_list;
            } else{
                alert("Something Wrong!");
                window.location.href='/';
            }
        });
    }

    function randomBooks(callback) {
        $.ajax({
            async: false,
            url:"http://localhost:8000/api/books/random",
            data: {
                count: 12,
            },
            method: "GET",
            success: function (data) {
                console.log(data.message);
                if (data.message == "Got random books") {
                    callback(data);
                } else {
                    callback(null);
                }
            },
            error: function () {
                console.log("server error!");
                callback(null);
            }
        });
    }

    const classes = Style();
    const token = CookieService.get('access_token');
    request();
    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            ReadRecommend
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            A seamless platform for book lovers to explore personalized book recommendations.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                {(userSignedIn) ?
                                    (null) :
                                    (<Grid item>
                                        <Button
                                            component={Router.Link} to="/auth/signup"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Sign up for free!
                                        </Button>
                                    </Grid>)
                                }

                                {/*Search Bar*/}

                                <Grid item>
                                    <Paper className={classes.root}>
                                        <TextField
                                            className={classes.input}
                                            placeholder="Find a Book"
                                            value={SearchForm.title}
                                            name="title"
                                            label="Search ReadRecommend"
                                            onChange={onTextboxChange}
                                        />
                                        <IconButton type="submit" onClick={preventDefault} className={classes.iconButton} aria-label="search" >
                                            <SearchIcon />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card.book_isbn} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random?book"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.book_title}
                                        </Typography>
                                        <Typography>
                                            By Author: {card.book_author}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" component={Router.Link} to={"/bookdata/metadata?isbn="+card.book_isbn}>
                                            View
                                        </Button>
                                        {(userSignedIn) ? (<Button size="small" color="primary" endIcon={<AddIcon />} onClick={() => addBook(card.book_isbn)}> Add to Libary </Button>)
                                                        : (null)}
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

export default Main;
