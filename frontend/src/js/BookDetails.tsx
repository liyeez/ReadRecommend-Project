// BookDetails.tsx
// Displays details for a particular book including book metadata and book reviews.

import React from "react";
import * as Router from "react-router-dom";
import $ = require("jquery");

// Page Imports
import Reviews from "./Reviews";

import CookieService from "../services/CookieService";
// Material UI
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Carousel from "react-material-ui-carousel";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import PersonIcon from "@material-ui/icons/Person";
import StarIcon from "@material-ui/icons/Star";
import Typography from "@material-ui/core/Typography";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

declare const API_URL: string;

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    height: 500,
    width: 700,
    justify: "center",
    backgroundPosition: "center",
  },
  root: {
    height: "100vh",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(45),
    paddingRight: theme.spacing(4),
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
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    align: 'center',
    height: 500,
  },
  blockSpacing: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

interface Props {}


const BookDetails: React.FC<Props> = ({}) => {
  //styling
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const token = CookieService.get("access_token");
  
  //getting book id from url
  let str = window.location.href.split("?")[1];
  let type = str.split("=")[0];
  str = str.split("=")[1];
  console.log("To find: " + str + " of type: " + type);
  
  let book: any;
  let inLibFlag =-1; // to check if the book is in user's library

  // search for the book details
  function request() {
    var data = onSearch(function (data) {
      if (data != null) {
        console.log(data);
        book = data; //store book
      } else {
        alert("Failed to get book data!");
        window.location.href = "/";
      }
    });
  }

  // add book to library
  function addBook(id) {
    var data = addLib(id, function (data) {
      if (data != null) {
        console.log(data);
        if(data.message == "Book added to library"){
          window.location.href='/bookdata/metadata?id=' + id;
        } 
      } else {
        alert(data.message);
      }
    });
  }

  function addLib(id, callback) {
    console.log(id);
    $.ajax({
      async: false,
      url: API_URL + "/api/collections/add_to_library",
      data: {
        auth: token,
        id: str,
      },
      method: "POST",
      success: function (data) {
        console.log(data);
        if (data.message == "Book added to library") {
          callback(data);
        } 
      },
      error: function () {
        console.log("server error!");
        callback(null);
      },
    });
  }

  // remove book from library
  function removeBook(id) {
    $.ajax({
      async: false,
      url: API_URL + "/api/collections/delete_from_library",
      data: {
        auth: token,
        id: id,
      },
      method: "POST",
      success: function (data) {
        console.log(data);
        if (data.message == "Book removed from library") {
            window.location.href='/bookdata/metadata?id=' + id;
        }else{
            alert(data.message);
        }  
      },
      error: function () {
        console.log("server error!");
      },
    });
  }

  // check if the book is in the library
  function inLib() {
    let str = window.location.href.split("?")[1];
    str = str.split("=")[1];

    $.ajax({
      async: false,
      url: API_URL + "/api/user/in_library",
      data: {
        auth: token,
        book_id: str,
      },
      method: "GET",
      success: function (data) {
        console.log(data);
        if(data.in_library){
          inLibFlag +=1; //change flag accordingly
        }
        console.log(inLibFlag);
      },
      error: function () {
        console.log("server error!");
      },
    });
  }
  
  // get book data from backend
  function onSearch(callback) {
    //get book id 
    let str = window.location.href.split("?")[1];
    str = str.split("=")[1];
    console.log("getting data for bookID: " + str);

    $.ajax({
      async: false,
      url: API_URL + "/api/books/data",
      data: {
        id: str,
      },
      method: "GET",
      success: function (data) {
        console.log(data.message);
        if (data.message == "Got book data") {
          callback(data);
        } else {
          callback(null);
        }
      },
      error: function () {
        console.log("server error!");
        callback(null);
      },
    });
  }
  
  // only check if book is in user library if the current user is signed in
  if(token){
    inLibFlag = 0;
    inLib();
  }
  
  request();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>

         <Container maxWidth="xl">
          <Grid container spacing={3} className={classes.container}>
            {/*Book Cover*/}
            <Grid item xs={12} md={8} lg={9} className={classes.image} />
            {/*Book Metadata*/}
            <Grid item xs={12} md={8} lg={9}>
              
              <Paper className={classes.paper}>
              
                <Grid>
                  <Typography variant="h4" align="center" color="textPrimary">
                    {book.book_title}
                  </Typography>
                  <Typography component="p" align="center">
                    By Author: {book.book_author}
                  </Typography>
                  <Typography
                    component="p"
                    align="center"
                  >
                    Published by: {book.book_pub_date}
                  </Typography>
                  <Typography
                    component="p"
                    align="center"
                  >
                    Genre: {book.book_genre}
                  </Typography>
                  <Typography
                    component="p"
                    align="center"
                  >
                    Publisher: {book.book_publisher}
                  </Typography>
                  <Typography
                    component="p"
                    align="center"
                    className={classes.blockSpacing}
                  >
                   {book.book_description}
                  </Typography>

                  <Typography component="p" align="center">
                      Average User Rating: {book.average_rating} <StarIcon/>
                  </Typography>
                  <Typography component="p" align="center">
                      Number of Readers: {book.n_readers} <PersonIcon />
                  </Typography>
                  <Typography component="p" align="center">
                      Times Added to Collection: {book.n_collections} <LibraryBooksIcon />
                  </Typography>

                  <Grid container justify="center" className={classes.blockSpacing}>
                    {/*Displays add or remove from library depending on flag*/}
                    { inLibFlag == 0
                      ? (<Button
                          onClick={() => addBook(book.book_id)}
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Add to Library
                        </Button>)
                      : (null)
                    }
                    { inLibFlag == 1
                      ? (<Button
                          onClick={() => removeBook(book.book_id)}
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Remove from Library
                        </Button>)
                      : (null)
                    }
                  </Grid>
                </Grid>
              </Paper>  
            </Grid>
          </Grid>
        </Container>

      {/*Displays Reviews*/}
        <Container maxWidth="xl">
          <Grid container spacing={3} className={classes.container}>
          
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={classes.paper}>
                <Reviews book={book}/>
              </Paper>
            </Grid>
            
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default BookDetails;

