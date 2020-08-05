
import $ = require("jquery");
import React, { ChangeEvent, useState } from "react";
import * as Router from "react-router-dom";
import CookieService from "../services/CookieService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LanguageIcon from '@material-ui/icons/Language';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from "@material-ui/core/styles";

declare const API_URL: string;

const token = CookieService.get("access_token");
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
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  button: {
    paddingTop: '10%', 
    
  },
}));


interface Props {}

interface SearchForm {
  title: any;
}

var index = 0; //to record the size of the results returned by externalSearch
let tempExtBooks: any = []; //to temporary store books returned

const Search: React.FC<Props> = ({}) => {
  
  const classes = Style();
  const [SearchForm, setSearchForm] = useState<SearchForm>({ // for search string
      title: "",
  });
  
  const [ loadTimes, setLoadTimes ] = useState(false); // to ensure render only once
  const [ extBooks, setExtBooks ] = useState([]); // to store reviews returned from render

  // setState for search string 
  const onTextboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchForm((prevSearchForm) => {
      return {
        ...prevSearchForm,
        [name]: value,
      };
    });
  };


  //search for books externally (does not create book obj in backend)
  function extSearch() {
    $.ajax({
      async: false,
      url: API_URL + "/api/books/search_book",
      data: {
        auth: token,
        search: txt,
        index: index,
      },
      method: "GET",
      success: function (data) {
        if (data != null && data.message == "Success") {
          setLoadTimes(true); //to stop re-rendering
          setExtBooks(data.results);
          index = data.current_index;
        }
       
      },
      error: function () {
        setLoadTimes(true); //to stop re-rendering
        console.log("external search server error!");
      },
    });
  }

  // to store book in the backend when user decide to view the book
  function storeBook(book) {

    // to fill in incomplete fields
    if(book.book_author == ""){
      book.book_author = 'Unknown';
    }

    let date = book.book_pub_date.split("-");
    if(date.length < 3){ //incomplete published date
      if(parseInt(date[0]) > 1000){ //check if its year
          book.book_pub_date = date[0] + '-' + '01' + '-' + '01'; //default jan first
      }else{
          book.book_pub_date = '2000' + '-' + '01' + '-' + '01'; 
      }
    }

    $.ajax({
      async: false,
      url: API_URL + "/api/books/add_book",
      data: {
        auth: token,
        book_title: book.book_title,
        book_author: book.book_author,
        book_genre: book.book_genre,
        book_description: book.book_description,
        book_isbn: book.book_isbn,
        book_cover: book.cover,
        book_pub_date: book.book_pub_date,
      },
      method: "POST",
      success: function (data) {
        if (data != null) {
            console.log(data);
            index = data.current_index;
            if(data.message == "Book already exists"){
                window.location.href = "/bookdata/metadata?id=" + data.book_id;
            }else if(data.message == "Book added to system"){
                window.location.href = "/bookdata/metadata?id=" + data.book_id;
            }
        }    
      },
      error: function () {
        console.log("storeBook server error!");
      },
    });
  }
  
  //redirect to search locally
  function localSearch(event) {
    event.preventDefault();
    window.location.href = "/search?title=" + SearchForm.title;
  }

  //redirect to search externally
  function externalSearch(event) {
    event.preventDefault();
    window.location.href = "/extsearch?title=" + SearchForm.title + "?index=0";
  }

  let type = (window.location.href.split("?")[1]).split("=")[0];
  let index = (window.location.href.split("?")[2]).split("=")[1];
  let array = ((window.location.href.split("?")[1]).split("=")[1]).split("%20");
  let check = ((window.location.href.split("?")[1]).split("=")[1]).split("%27");

  if(check){
    alert("Apostrophe degrades our performance! Please try another search string");
  }

  //split string to append with string
  var txt = "";
  for(let i=0; i < array.length; i++ ){
      txt = txt.concat(array[i]);
      if(i != array.length-1){
        txt = txt.concat(" ");
      }  
  }
  
  //get more results using index
  function moreResults() {
    console.log("more results with: " + index);
    window.location.href = "/extsearch?title=" + txt + "?index=" + index;
  }

  if(!loadTimes){ // to prevent re-rendering
    extSearch();
  }
  
  tempExtBooks = extBooks;

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Title of Page and Search bar */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              External Search Results for
            </Typography>
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="textSecondary"
              gutterBottom
            >
              "{txt}"
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
                    <IconButton
                      type="submit"
                      className={classes.iconButton}
                      aria-label="search"
                      onClick={localSearch}
                    >
                      <SearchIcon />
                    </IconButton>
                    <IconButton
                      type="submit"
                      className={classes.iconButton}
                      aria-label="search"
                      onClick={externalSearch}
                    >
                      <LanguageIcon />
                    </IconButton>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
       
        {/*Display results*/}
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                { tempExtBooks.length > 0 
                  ? (null)
                  :(<Typography 
                      align='center'
                      component="h5"
                      color="textSecondary"
                     > 
                     <SentimentVeryDissatisfiedIcon/>
                     {'      '}No results for {txt} 
                   </Typography>)
                }
                {tempExtBooks.map((book) => (
                    <Grid item key={book} xs={12} sm={6} md={4}>
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
                          <Typography>By Author: {book.book_author}</Typography>
                          <Typography>Published on: {book.book_pub_date}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                              size="small"
                              color="primary"
                              onClick={() => storeBook(book)}
                            >
                              View
                            </Button>
                        </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>


            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
              onClick={moreResults}
            > 
              More Results 
              <MoreHorizIcon/>
            
            </IconButton>

        </Container>
      </main>
    </React.Fragment>
  );
};

export default Search;
