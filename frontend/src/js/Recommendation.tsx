import React, {ChangeEvent, useState} from "react";
import $ = require("jquery");
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Chip from "@material-ui/core/Chip";
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
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import Card from "@material-ui/core/Card";
import WhatshotIcon from '@material-ui/icons/Whatshot';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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

    },
    chip: {
        margin: theme.spacing(0.5),
    },
    padding: {
        paddingTop: '20%',
        paddingBottom: '20%',
    },
    
}));

const slides = [
    { backgroundColor: '#ff7c7c', title: 'Slide 1' },
    { backgroundColor: '#ffb6b9', title: 'Slide 2' },
    // { backgroundColor: '#8deaff', title: 'Slide 3' },
    // { backgroundColor: '#ffe084', title: 'Slide 4' },
    // { backgroundColor: '#d9d9d9', title: 'Slide 5' },
    // { backgroundColor: '#ecc6c6', title: 'Slide 6' },
];

interface Props{}

interface SearchForm {
    title: any;
}

function viewBook(id){
    window.location.href = "/bookdata/metadata?id=" + id;
}

function viewCollection(data){
    let s = (`?collectionid=${encodeURIComponent(data)}`);
    window.location.href="/user/viewcollection" + s;
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
                  onClick={() => viewBook(books[index].id)}
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>

    );
}

function CollectionStyle(props){
    
    const {collection, index} = props;
    console.log(collection);
    const classes = styles();
    console.log("displaying collection index: " + index);
    console.log(collection[index]);
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
                  {collection[index].collection_name}
                </Typography>
                  
                { collection[index].tag_list.map((tag)=>
                   <Chip label={tag} className={classes.chip}/>
                )}
                
                
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => viewCollection(collection[index].collection_id)}
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
    // const [index, setIndex] = useState(0);
    // const [index2, setIndex2] = useState(1);
    // const [index3, setIndex3] = useState(2);
    
    //for your fav genre suggestions
    let index =0;
    let index2 = 1;
    let index3 = 2;

    let numSlides =0;

    //for readers who read the same genre suggestions
    let read =0;
    let read2 = 1;
    let read3 = 2;

    let numRead =0;

    //for suggestions based on reading history
    let hist =0;
    let hist2 = 1;
    let hist3 = 2;

    let numHist =0;

    //for collections that share same tags as the user 
    let tagCol =0;
    let tagCol2 = 1;
    let tagCol3 = 2;

    let numTagCol =0;
    
    const onArrowGenre = (direction) => {
        const increment = direction === 'left' ? -1 : 1;
        index = (index + increment + numSlides) % numSlides;
        index2 = (index2 + increment + numSlides) % numSlides;
        index3 = (index3 + increment + numSlides) % numSlides;
  
    };

    const onArrowRead = (direction) => {
        const increment = direction === 'left' ? -1 : 1;
        read = (read + increment + numRead) % numRead;
        read2 = (read2 + increment + numRead) % numRead;
        read3 = (read3 + increment + numRead) % numRead;
  
    };

    const onArrowHist = (direction) => {
        const increment = direction === 'left' ? -1 : 1;
        hist = (hist + increment + numHist) % numHist;
        hist2 = (hist2 + increment + numHist) % numHist;
        hist3 = (hist3 + increment + numHist) % numHist;
  
    };

    const onArrowTag = (direction) => {
        const increment = direction === 'left' ? -1 : 1;
        tagCol = (tagCol + increment + numTagCol) % numTagCol;
        tagCol2 = (tagCol2 + increment + numTagCol) % numTagCol;
        tagCol3 = (tagCol3 + increment + numTagCol) % numTagCol;
  
    };

    const classes = styles();
    
    //it checks what other readers read same book as you, then check 
    let histRec: any;
    function getHistory() {
      const token = CookieService.get('access_token');
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/books/history",
            data: {
                auth: token,
            },
            method: "GET",
            success: function (data) {
                if (data != null && data.message == 'recommendations found') {
                    console.log(data);
                    histRec = data.book_list;
                    numHist = histRec.length;
                }else{
                  histRec = [];
                }
                
            },
            error: function () {
                console.log("history server error!");
            }
        });
    }

    

    let readerBooks: any;
    let basedOn : any;
    function getRead() {
      const token = CookieService.get('access_token');
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/books/readers",
            data: {
                auth: token,
            },
            method: "GET",
            success: function (data) {
                console.log(data);
                if (data != null && data.message == "Books retrieved") {
                    console.log('storing readerBooks');
                    readerBooks = data.book_list;
                    basedOn = data.based_on;
                    numRead = readerBooks.length;
                }else{
                  readerBooks = [];
                }
                
            },
            error: function () {
                console.log("reader book server error!");
            }
        });
    }    


    function getPopularGenre() {
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

    let TagCollections: any = [];
    function getTagCol() {
      const token = CookieService.get('access_token');
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/collections/get_similar_collections",
            data: {
                auth: token,
            },
            method: "GET",
            success: function (data) {

                if (data != null && data.message == 'Got collections') {
                    console.log('Storing TagCollections');
                    TagCollections = data.collection_list;
                    numTagCol = TagCollections.length;
                    console.log(TagCollections);
                }else{
                  TagCollections = [];
                }
                
            },
            error: function () {
                console.log("tag col server error!");
            }
        });
    } 
    
    getTagCol();
    getPopularGenre();
    getHistory();
    getRead();
    
    return (
    <React.Fragment>
          <CssBaseline />
            
            
            <Container className={classes.cardGrid} >
              <Grid container spacing={5} className={classes.carousel}>
                <Grid item>
                    <Typography gutterBottom variant="h5">
                       <WhatshotIcon /> Your favourite genre {genre} <WhatshotIcon />
                    </Typography>
                </Grid>
              </Grid>      
              { numSlides > 0
                ? (null)
                : (<Typography 
                      align='center'
                      component="h5"
                      color="textSecondary"
                     > 
                     <SentimentDissatisfiedIcon/>
                      {'    '} No books of your favourite genre!  
                     </Typography>)
              }
              
              { numSlides == 1
                  ? (<Grid container spacing={2} className={classes.cardGrid}>
                        <Grid item>
                          <Arrow
                              direction='left'
                              clickFunction={() => onArrowGenre('left')}
                          />
                        </Grid>
                        
                          <CardStyle books={books} index={index}/>
                       
                        <Grid item>  
                          <Arrow
                              direction='right'
                              clickFunction={() => onArrowGenre('right')}
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
                              clickFunction={() => onArrowGenre('left')}
                          />
                        </Grid>
                        <CardStyle books={books} index={index}/>
                        <CardStyle books={books} index={index2}/>
                          
                        <Grid item>  
                          <Arrow
                              direction='right'
                              clickFunction={() => onArrowGenre('right')}
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
                              clickFunction={() => onArrowGenre('left')}
                          />
                        </Grid>
                        <CardStyle books={books} index={index}/>
                        <CardStyle books={books} index={index2}/>
                        <CardStyle books={books} index={index3}/>
                        <Grid item>  
                          <Arrow
                              direction='right'
                              clickFunction={() => onArrowGenre('right')}
                          />
                        </Grid>
                     </Grid>

                     )
                  : (null)
              }
              
              {/*Most Read Genre*/}
              <Grid container spacing={5} className={classes.carousel}>
                <Grid item>
                    <Typography gutterBottom variant="h5">
                       <WhatshotIcon /> Reader who likes "{basedOn}" also read: <WhatshotIcon />
                    </Typography>
                </Grid>
              </Grid> 
              { numRead > 0
                ? (null)
                : (<Typography 
                      align='center'
                      component="h5"
                      color="textSecondary"
                     > 
                     <SentimentDissatisfiedIcon/>
                      {'    '} No one read "{basedOn}" 
                     </Typography>)
              }
              { numRead == 1
                  ? (<Grid container spacing={2} className={classes.cardGrid}>
                        <Grid item>
                          <Arrow
                              direction='left'
                              clickFunction={() => onArrowRead('left')}
                          />
                        </Grid>
                        
                          <CardStyle books={readerBooks} index={read}/>
                       
                        <Grid item>  
                          <Arrow
                              direction='right'
                              clickFunction={() => onArrowRead('right')}
                          />
                        </Grid>
                     </Grid>

                     )
                  : (null)
              } 

              { numRead == 2
                  ? (<Grid container spacing={2} className={classes.cardGrid}>
                        <Grid item>
                          <Arrow
                              direction='left'
                              clickFunction={() => onArrowRead('left')}
                          />
                        </Grid>
                        <CardStyle books={readerBooks} index={read}/>
                        <CardStyle books={readerBooks} index={read2}/>
                          
                        <Grid item>  
                          <Arrow
                              direction='right'
                              clickFunction={() => onArrowRead('right')}
                          />
                        </Grid>
                     </Grid>

                     )
                  : (null)
              }

              { numRead > 2
                  ? (<Grid container spacing={2} className={classes.cardGrid}>
                        <Grid item>
                          <Arrow
                              direction='left'
                              clickFunction={() => onArrowRead('left')}
                          />
                        </Grid>
                        <CardStyle books={readerBooks} index={read}/>
                        <CardStyle books={readerBooks} index={read2}/>
                        <CardStyle books={readerBooks} index={read3}/>
                        <Grid item>  
                          <Arrow
                              direction='right'
                              clickFunction={() => onArrowRead('right')}
                          />
                        </Grid>
                     </Grid>

                     )
                  : (null)
              }

              {/*Shared tags Collection from other users*/}
              <Grid container spacing={5} className={classes.carousel}>
                <Grid item>
                    <Typography gutterBottom variant="h5">
                       <WhatshotIcon /> Collections that share the same tags as you: <WhatshotIcon />
                    </Typography>
                </Grid>
              </Grid> 
              { numTagCol > 0
                ? (null)
                : (<Typography 
                      align='center'
                      component="h5"
                      color="textSecondary"
                     > 
                     <SentimentDissatisfiedIcon/>
                      {'    '} No collections tagged like yours!  
                     </Typography>)
              }
              { numTagCol == 1
                  ? (<Grid container spacing={2} className={classes.cardGrid}>
                        <Grid item>
                          <Arrow
                              direction='left'
                              clickFunction={() => onArrowTag('left')}
                          />
                        </Grid>
                        
                          <CollectionStyle collection={TagCollections} index={tagCol}/>
                       
                        <Grid item>  
                          <Arrow
                              direction='right'
                              clickFunction={() => onArrowTag('right')}
                          />
                        </Grid>
                     </Grid>

                     )
                  : (null)
              } 

              { numTagCol == 2
                  ? (<Grid container spacing={2} className={classes.cardGrid}>
                        <Grid item>
                          <Arrow
                              direction='left'
                              clickFunction={() => onArrowTag('left')}
                          />
                        </Grid>
                        <CollectionStyle collection={TagCollections} index={tagCol}/>
                        <CollectionStyle collection={TagCollections} index={tagCol2}/>
                          
                        <Grid item>  
                          <Arrow
                              direction='right'
                              clickFunction={() => onArrowTag('right')}
                          />
                        </Grid>
                     </Grid>

                     )
                  : (null)
              }

              { numTagCol > 2
                  ? (<Grid container spacing={2} className={classes.cardGrid}>
                        <Grid item>
                          <Arrow
                              direction='left'
                              clickFunction={() => onArrowTag('left')}
                          />
                        </Grid>
                        <CollectionStyle collection={TagCollections} index={tagCol}/>
                        <CollectionStyle collection={TagCollections} index={tagCol2}/>
                        <CollectionStyle collection={TagCollections} index={tagCol3}/>
                        <Grid item>  
                          <Arrow
                              direction='right'
                              clickFunction={() => onArrowTag('right')}
                          />
                        </Grid>
                     </Grid>

                     )
                  : (null)
              }


              {/*recommendations based on reading history*/}
              <Grid container spacing={5} className={classes.carousel}>
                <Grid item>
                    <Typography gutterBottom variant="h5">
                       <WhatshotIcon /> Recommendations based on your history: <WhatshotIcon />
                    </Typography>
                </Grid>
              </Grid> 
              { numHist > 0
                ? (null)
                : (<Typography 
                      align='center'
                      component="h5"
                      color="textSecondary"
                     > 
                     <SentimentDissatisfiedIcon/>
                      {'    '} No books!  
                     </Typography>)
              }
              { numHist == 1
                  ? (<Grid container spacing={2} className={classes.cardGrid}>
                        <Grid item>
                          <Arrow
                              direction='left'
                              clickFunction={() => onArrowHist('left')}
                          />
                        </Grid>
                        
                          <CardStyle books={histRec} index={hist}/>
                       
                        <Grid item>  
                          <Arrow
                              direction='right'
                              clickFunction={() => onArrowHist('right')}
                          />
                        </Grid>
                     </Grid>

                     )
                  : (null)
              } 

              { numHist == 2
                  ? (<Grid container spacing={2} className={classes.cardGrid}>
                        <Grid item>
                          <Arrow
                              direction='left'
                              clickFunction={() => onArrowHist('left')}
                          />
                        </Grid>
                        <CardStyle books={histRec} index={hist}/>
                        <CardStyle books={histRec} index={hist2}/>
                          
                        <Grid item>  
                          <Arrow
                              direction='right'
                              clickFunction={() => onArrowHist('right')}
                          />
                        </Grid>
                     </Grid>

                     )
                  : (null)
              }

              { numHist > 2
                  ? (<Grid container spacing={2} className={classes.cardGrid}>
                        <Grid item>
                          <Arrow
                              direction='left'
                              clickFunction={() => onArrowHist('left')}
                          />
                        </Grid>
                        <CardStyle books={histRec} index={hist}/>
                        <CardStyle books={histRec} index={hist2}/>
                        <CardStyle books={histRec} index={hist3}/>
                        <Grid item>  
                          <Arrow
                              direction='right'
                              clickFunction={() => onArrowHist('right')}
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

