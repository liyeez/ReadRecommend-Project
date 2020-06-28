// Main.tsx
// Main page

import $ = require('jquery');
import React, {ChangeEvent, useState} from "react";
import * as Router from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
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

interface Props {

}

interface SearchForm {
    title: any;
}

const Search: React.FC<Props> = ({}) => {
    
    let cards: any;

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

    function request() {
        var data = onSearch(function(data){ 
            if(data != null){
                var myObject = JSON.parse(data);
                cards = myObject;
                console.log(cards[0].fields);
            }else{
                alert("No Matched Results!");
                window.location.href='/';
            }
            
        });
    }

    function newSearch(event) {
        event.preventDefault();
        window.location.href="/search?title="+SearchForm.title;
    }

    function onSearch(callback) {
        let str = window.location.href.split('?')[1];
        str = str.split('=')[1];
        console.log(str);
        
        $.ajax({
            async: false,
            url:"http://localhost:8000/api/books/search",
            data: {
                title: str,
            },
            method: "GET",
            success: function (data) {
                console.log(data.message);
                if(data.message == 'Titles found success') {
                    
                    callback(data.data);

                }else if(data.message == 'title not found') {
                    callback(null);
                }
            },
            error: function () {
                console.log("server error!");
                
            }
        });
    }

    function viewBook(data){
        window.location.href="/bookdata/metadata?isbn="+data;
    }

   
    onSearch(request);
    const classes = Style();
    let str = window.location.href.split('?')[1];
    str = str.split('=')[1];
    console.log(str);

    return (

        <React.Fragment>
            <CssBaseline />

            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Search Results for
                        </Typography>
                        <Typography component="h1" variant="h3" align="center" color="textSecondary" gutterBottom>
                            "{str}"
                        </Typography>
                        
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Paper component="form" className={classes.root}>
                                        <TextField
                                            className={classes.input}
                                            value={SearchForm.title}
                                            name="title"
                                            label="Search ReadRecommend"
                                            onChange={onTextboxChange}
                                            
                                        />
                                        <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={newSearch}>
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
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random?book"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.fields.title}
                                        </Typography>
                                        <Typography>
                                            Author: {card.fields.author}
                                        </Typography>
                                         <Typography>
                                            Published On: {card.fields.pub_date}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => viewBook(card.pk)}>
                                            View
                                        </Button>
                                    </CardActions>

                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* TBD...
                        <IconButton type="submit" component={Router.Link} to="/search" className={classes.iconButton} aria-label="search">
       
                            <SearchIcon/>
                            More Results....
                        </IconButton>
                    */}
                </Container>
            </main>
        </React.Fragment>
    );
}

export default Search;