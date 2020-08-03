import $ = require("jquery");
import React, { ChangeEvent, useState } from "react";
import * as Router from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Box from "@material-ui/core/Box";
import Slider from "@material-ui/core/Slider";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import LanguageIcon from '@material-ui/icons/Language';
import { makeStyles } from "@material-ui/core/styles";

declare const API_URL: string;

const marks = [
    {value: 0, label: '0'},
    {value: 1, label: '1'},
    {value: 2, label: '2'},
    {value: 3, label: '3'},
    {value: 4, label: '4'},
    {value: 5, label: '5'},
];

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
}));

interface Props {}

interface SearchForm {
  title: any;
}

const Search: React.FC<Props> = ({}) => {
  let books: Array<any> = [];
  let users: Array<any> = [];
  let averageRating : number = 0;
  let totalRatings : number = 0;
  let readCount : number = 0;
  let collectionCount : number = 0;

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
    var data = onSearch(function (data) {
      console.log(data);
      if (data != null) {
        if (data.message == "Got matching books") {
            books = data.book_list;
        } else if (data.message == "Got users") {
            users = data.user_list;
        } 
      }
    });
  }

  function newSearch(event) {
    event.preventDefault();
    window.location.href = "/search?title=" + SearchForm.title;
  }

  function externalSearch(event) {
    event.preventDefault();
    window.location.href = "/extsearch?title=" + SearchForm.title + "?index=0";
  }

  function advSearch(event) {
    event.preventDefault();
    window.location.href = "/search?title=" + SearchForm.title;
  }

  function onSearch(callback) {
    console.log('search for: ' + txt);
    console.log(api_call);
    $.ajax({
      async: false,
      url: api_call,
      data: {
        search: txt,
        
      },
      method: "GET",
      success: function (data) {
        console.log(data);
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

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
      setExpanded(!expanded);
  };

  const [minimumRating, setMinimumRating] = React.useState<number | string | Array<number | string>>(0);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
      setMinimumRating(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setMinimumRating(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
      if (minimumRating < 0) {
          setMinimumRating(0);
      } else if (minimumRating > 5) {
          setMinimumRating(5);
      }
  };

  const [ filterState, setFilterState ] = useState({
      minimumTotalRatings: 0,
      minimumReadCount: 0,
      minimumCollectionCount: 0,
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilterState({...filterState, [event.target.name]: event.target.value});
  }

  function advSearchLocal(event) { 
      window.location.href = "/search?title=" + SearchForm.title + "?average_rating=" + minimumRating + 
          "?total_ratings=" + filterState.minimumTotalRatings + "?read_count=" + filterState.minimumReadCount + 
          "?collection_count=" + filterState.minimumCollectionCount;
  }

  function viewBook(data) {
      window.location.href = "/bookdata/metadata?id=" + data;
  }

  function viewUser(data) {
      window.location.href = "/user/otherusers?userid=" + data;
  }

  const classes = Style();
  let parameters = window.location.href.split("?");
  
  if (parameters.length === 6) {
      averageRating = parseFloat(parameters[2].split("=")[1]);
      totalRatings = parseFloat(parameters[3].split("=")[1]);
      readCount = parseFloat(parameters[4].split("=")[1]);
      collectionCount = parseFloat(parameters[5].split("=")[1])
  }

  console.log(averageRating);
  console.log(totalRatings);
  console.log(readCount);
  console.log(collectionCount);

  let str = window.location.href.split("?")[1];
  let type = str.split("=")[0];
  str = str.split("=")[1];
  let array = str.split("%20");
  console.log(array);
  var txt = "";
  for(let i=0; i < array.length; i++ ){
      txt = txt.concat(array[i]);
      if(i != array.length-1){
          txt = txt.concat(" ");
      }
      console.log(txt);
  }
  
  console.log("To find: " + txt + " of type: " + type);

  let api_call: string;
  let s = window.location.href.split("?");
  console.log("length: " + s.length);
  if (type == "title" && s.length == 2) {
    console.log('call search API');
    api_call = API_URL + "/api/books/search";
  } else if (type == "finduser") {
    api_call = API_URL + "/api/user/find_users";
  } else if (type == "title" && s.length > 2){
    console.log('call filter API');
    api_call = API_URL + "/api/books/filter";
  }

  onSearch(request);

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
              Local Search Results
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
                      onClick={newSearch}
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

                  <Paper>
                      <Grid>
                          <Collapse in={expanded} timeout="auto" unmountOnExit>
                              <Grid item>
                                  <Box m={2}>
                                      <Typography id="input-slider" gutterBottom>Filter By Minimum Rating</Typography>
                                      <Slider 
                                          value={typeof minimumRating === 'number' ? minimumRating : 0}
                                          onChange={handleSliderChange}
                                          aria-labelledby="input-slider"
                                          min={0} max={5} step={1}
                                          marks={marks}
                                      />
                                      <Input 
                                          className={classes.input} 
                                          value={minimumRating} 
                                          margin="dense"
                                          onChange={handleInputChange}
                                          onBlur={handleBlur}
                                          inputProps={{step: 1, min: 0, max: 5, type: 'number', 'aria-labelledby': 'input-slider'}}
                                      />
                                  </Box>
                                  <Box m={2}>
                                      <TextField 
                                      id="minimumTotalRatings" name="minimumTotalRatings"
                                      label="Minimum Total Ratings" type="number"
                                      value={filterState.minimumTotalRatings}
                                      onChange={handleFilterChange}
                                      />
                                  </Box>
                                  <Box m={2}>
                                      <TextField
                                          id="minimumReadCount" name="minimumReadCount"
                                          label="Minimum Read Count" type="number"
                                          value={filterState.minimumReadCount}
                                          onChange={handleFilterChange}
                                      />
                                  </Box>
                                  <Box m={2}>
                                      <TextField 
                                      id="minimumCollectionCount" name="minimumCollectionCount"
                                      label="Minimum Collection Count" type="number"
                                      value={filterState.minimumCollectionCount}
                                      onChange={handleFilterChange}
                                      />
                                  </Box>
                              </Grid>
                              <Grid item>
                                  <Box m={2}>
                                      <Button color="primary" onClick={advSearchLocal}>
                                          Advanced Search
                                      </Button>
                                  </Box>
                              </Grid>
                          </Collapse>
                      </Grid>
                  </Paper>

                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {books.map((book) => (
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
                      onClick={() => viewBook(book.book_id)}
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}

            {users.map((user) => (
              <Grid item key={user} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random?book"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {user.first_name + " " + user.last_name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => viewUser(user.user_id)}
                    >
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
};

export default Search;