
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
import { makeStyles } from "@material-ui/core/styles";

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

const Search: React.FC<Props> = ({}) => {
  let extBooks: Array<any> = [];

  const classes = Style();
  const [SearchForm, setSearchForm] = useState<SearchForm>({
      title: "",
  });

  const onTextboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchForm((prevSearchForm) => {
      return {
        ...prevSearchForm,
        [name]: value,
      };
    });
  };

  function request() {

    var res = extSearch(function (res) {
      console.log(res);
      if (res!= null && res.message == "Success") {
        extBooks = res.results;
      } 
    });
  }

  function extSearch(callback) {
    $.ajax({
      async: false,
      url: "http://localhost:8000/api/books/search_book",
      data: {
        auth: token,
        search: str,
      },
      method: "GET",
      success: function (data) {
        if (data != null) {
          console.log(data);
          callback(data);
        }
        callback(null);
      },
      error: function () {
        console.log("external search server error!");
        callback(null);
      },
    });
  }

  function storeBook(book) {
    console.log("In storeBook");
    console.log(book);
    $.ajax({
      async: false,
      url: "http://localhost:8000/api/books/add_book",
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
            console.log("added book to library");
            if(data.message == "Book already exists"){
                window.location.href = "/bookdata/metadata?id=" + book.book_isbn;
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

  function localSearch(event) {
    event.preventDefault();
    window.location.href = "/search?title=" + SearchForm.title;
  }

  function externalSearch(event) {
    event.preventDefault();
    window.location.href = "/extsearch?title=" + SearchForm.title;
  }

  let str = window.location.href.split("?")[1];
  let type = str.split("=")[0];
  str = str.split("=")[1];
  console.log("To find ext: " + str + " of type: " + type);

  request();
  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
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
       
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                {extBooks.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
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
                          <Typography>By Author: {card.book_author}</Typography>
                          <Typography>Published on: {card.book_pub_date}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                              size="small"
                              color="primary"
                              onClick={() => storeBook(card)}
                            >
                              View
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
};

export default Search;
