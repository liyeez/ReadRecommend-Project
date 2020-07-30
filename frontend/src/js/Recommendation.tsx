import React, {ChangeEvent, useState} from "react";
import $ = require("jquery");
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CookieService from "../services/CookieService";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import Card from "@material-ui/core/Card";
import WhatshotIcon from '@material-ui/icons/Whatshot';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CarouselSlide from "./CarouselSlide";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import * as Router from 'react-router-dom';
declare const API_URL: string;

const styles= makeStyles((theme) => ({
   
    cardGrid: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      alignContent: 'left',
      justifyContent: 'center',
      width: '1000px',
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
    App: { // the item's size
        margin: '0px 0px',
        width: '270px',
        justifyContent: 'center',   
    },
    carousel:{ //width doesnt affect
      justifyContent: 'center',
    }
    
}));

const slides = [
    { backgroundColor: '#ff7c7c', title: 'Slide 1' },
    { backgroundColor: '#ffb6b9', title: 'Slide 2' },
    // { backgroundColor: '#8deaff', title: 'Slide 3' },
    // { backgroundColor: '#ffe084', title: 'Slide 4' },
    // { backgroundColor: '#d9d9d9', title: 'Slide 5' },
    // { backgroundColor: '#ecc6c6', title: 'Slide 6' },
];

function viewBook(id){

}


interface Props{}

interface SearchForm {
    title: any;
}

function CardStyle(props){

    const {books, index} = props;
    const classes = styles();
    console.log("displaying book index: " + index);
    console.log(books[index]);
    return(
        <Grid item className={classes.App}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random?book"
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {books[index].book_title}
                </Typography>
                <Typography>By Author: {books[index].book_author}</Typography>
                <Typography>Published on: {books[index].book_pub_date}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => viewBook(books[index].book_id)}
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>

    );
}

function Arrow(props) {
    const { direction, clickFunction } = props;
    const icon = direction === 'left' ? <IconButton><ArrowBackIcon /></IconButton> : <IconButton><ArrowForwardIcon /></IconButton>;

    return <div onClick={clickFunction}>{icon}</div>;
}

// export interface ContentProps extends WithStyles<typeof styles> {}
const FindUser: React.FC<Props> = ({}) => {
    let books: any = [];
    let genre: any = [];
    const [index, setIndex] = useState(0);
    const [index2, setIndex2] = useState(1);
    const [index3, setIndex3] = useState(2);

    let numSlides =0;
    
    const onArrowClick = (direction) => {
        const increment = direction === 'left' ? -1 : 1;
        const newIndex = (index + increment + numSlides) % numSlides;
        const newIndex2 = (index2 + increment + numSlides) % numSlides;
        const newIndex3 = (index3 + increment + numSlides) % numSlides;
        setIndex(newIndex);
        setIndex2(newIndex2);
        setIndex3(newIndex3);
        console.log(newIndex + " " + newIndex2 +" " + newIndex3);
    };

    const classes = styles();

    
    function viewBook(id){

    }
    
    function getBooks() {
      const token = CookieService.get('access_token');
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/books/recommendations",
            data: {
                auth: token,
            },
            method: "GET",
            success: function (data) {
                if (data != null && data.message == 'Genre found') {
                    console.log(data);
                    books = data.book_list;
                    genre = data.Most_genre
                    numSlides = books.length;
                }
                
            },
            error: function () {
                console.log("server error!");
            }
        });
    }

    
  
    getBooks();
    console.log("length is: " + books.length);
    return (
    <React.Fragment>
          <CssBaseline />
            
            
            <Container className={classes.cardGrid} >
              <Grid container spacing={5} className={classes.carousel}>
                <Grid item>
                    <Typography gutterBottom variant="h4">
                       <WhatshotIcon /> Your favourite genre {} <WhatshotIcon />
                    </Typography>
                </Grid>
              </Grid>      

              
              { numSlides == 1
                  ? (<Grid container spacing={2} className={classes.cardGrid}>
                        <Grid item>
                          <Arrow
                              direction='left'
                              clickFunction={() => onArrowClick('left')}
                          />
                        </Grid>
                        
                          <CardStyle books={books} index={index}/>
                       
                        <Grid item>  
                          <Arrow
                              direction='right'
                              clickFunction={() => onArrowClick('right')}
                          />
                        </Grid>
                     </Grid>

                     )
                  : (null)
              } 

              { numSlides == 2
                  ? (<Grid container spacing={2} className={classes.cardGrid}>
                        <Grid item>
                          <Arrow
                              direction='left'
                              clickFunction={() => onArrowClick('left')}
                          />
                        </Grid>
                        <CardStyle books={books} index={index}/>
                        <CardStyle books={books} index={index2}/>
                          
                        <Grid item>  
                          <Arrow
                              direction='right'
                              clickFunction={() => onArrowClick('right')}
                          />
                        </Grid>
                     </Grid>

                     )
                  : (null)
              }

              { numSlides > 2
                  ? (<Grid container spacing={2} className={classes.cardGrid}>
                        <Grid item>
                          <Arrow
                              direction='left'
                              clickFunction={() => onArrowClick('left')}
                          />
                        </Grid>
                        <CardStyle books={books} index={index}/>
                        <CardStyle books={books} index={index2}/>
                        <CardStyle books={books} index={index3}/>
                        <Grid item>  
                          <Arrow
                              direction='right'
                              clickFunction={() => onArrowClick('right')}
                          />
                        </Grid>
                     </Grid>

                     )
                  : (null)
              }
              
              <Grid container spacing={5} className={classes.carousel}>
                <Grid item>
                    <Typography gutterBottom variant="h4">
                       <WhatshotIcon /> Reader who likes {genre} also read: <WhatshotIcon />
                    </Typography>
                </Grid>
              </Grid>      
              { numSlides == 1
                  ? (<Grid container spacing={2} className={classes.cardGrid}>
                        <Grid item>
                          <Arrow
                              direction='left'
                              clickFunction={() => onArrowClick('left')}
                          />
                        </Grid>
                        
                          <CardStyle books={books} index={index}/>
                       
                        <Grid item>  
                          <Arrow
                              direction='right'
                              clickFunction={() => onArrowClick('right')}
                          />
                        </Grid>
                     </Grid>

                     )
                  : (null)
              } 

              { numSlides == 2
                  ? (<Grid container spacing={2} className={classes.cardGrid}>
                        <Grid item>
                          <Arrow
                              direction='left'
                              clickFunction={() => onArrowClick('left')}
                          />
                        </Grid>
                        <CardStyle books={books} index={index}/>
                        <CardStyle books={books} index={index2}/>
                          
                        <Grid item>  
                          <Arrow
                              direction='right'
                              clickFunction={() => onArrowClick('right')}
                          />
                        </Grid>
                     </Grid>

                     )
                  : (null)
              }

              { numSlides > 2
                  ? (<Grid container spacing={2} className={classes.cardGrid}>
                        <Grid item>
                          <Arrow
                              direction='left'
                              clickFunction={() => onArrowClick('left')}
                          />
                        </Grid>
                        <CardStyle books={books} index={index}/>
                        <CardStyle books={books} index={index2}/>
                        <CardStyle books={books} index={index3}/>
                        <Grid item>  
                          <Arrow
                              direction='right'
                              clickFunction={() => onArrowClick('right')}
                          />
                        </Grid>
                     </Grid>

                     )
                  : (null)
              }
              
             
            </Container>

            <Container className={classes.cardGrid} maxWidth="md">

             
            </Container>
            
    </React.Fragment>

    );
    
}

export default FindUser;

