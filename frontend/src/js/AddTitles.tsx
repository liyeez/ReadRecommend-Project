import React, {ChangeEvent, useState} from "react";
import * as Router from 'react-router-dom';
import $ = require('jquery');

// Material UI
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
interface SearchForm {
    title: string;
}
interface Props {
    userSignedIn: boolean;
}

const AddTitles: React.FC<Props> = ({userSignedIn} : Props) => {
    const classes = Style();

    let book_list: any;

    let collectionId = window.location.href.split('?')[1];
    collectionId = collectionId.split('=')[1];

    const [SearchForm, setSearchForm] = useState<SearchForm>({
      title: '',
    });

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

    // Loads the new titles requested from backend.
    function getNewTitles() {
        var data = findNewTitles(function(data){
            if (data != null) {
                if (data.message == "Got random books") {
                    book_list = data.book_list;
                } else {
                    alert("No Matched Results!");
                    window.location.href='/';
                }
            }
        });
    }

    // Retrieves new titles from backend.
    function findNewTitles(callback) {
        $.ajax({
            async: false,
            url: 'http://localhost:8000/api/books/random',
            data: {
                count: 3,
            },
            method: "GET",
            success: function (data) {
                console.log(data);
                if(data != null) {
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

    // TODO: Add title to collection on backend.
    function addTitleToCollection(isbnToAdd) {
        $.ajax({
            async: false,
            url: 'http://localhost:8000/api/collections/add_title',
            data: {
                collection_id: collectionId,
                isbn: isbnToAdd,
            },
            method: "POST",
            success: function (data) {
                if (data != null) {
                    if (data == "Book added to collection") {
                        console.log("Successfully added title to collection!");
                    }
                }
            },
            error: function () {
                console.log("server error!");
            }
        });
    }

    getNewTitles();

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Add Titles
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Browse through books to add to your collection.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
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
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        color="default"
                                        component={Router.Link} to={"/user/editcollection?collectionid=" + collectionId}
                                        startIcon={<ArrowBackIosIcon />}
                                    >
                                        Back to Editing
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {/*TODO: Display book if not already inside the collection.*/}
                        {book_list.map((book) => (
                            <Grid item key={book.book_isbn} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random?book"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {book.book_title}
                                        </Typography>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam molestie pellentesque tortor in rhoncus.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" component={Router.Link} to={"/bookdata/metadata?isbn=" + book.book_isbn}>
                                            View
                                        </Button>
                                        {(userSignedIn) ? (<Button size="small" color="primary" onClick={() => addTitleToCollection(book.book_isbn)} endIcon={<AddIcon />}> Add to Collection </Button>)
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

export default AddTitles;
