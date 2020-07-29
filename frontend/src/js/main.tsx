// Main.tsx
// Main page

import $ = require("jquery");
import React, { ChangeEvent, useState } from "react";
import * as Router from "react-router-dom";
import CookieService from "../services/CookieService";

// Material UI
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from '@material-ui/core/InputAdornment';
import LanguageIcon from '@material-ui/icons/Language';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import Slider from "@material-ui/core/Slider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { FormControlLabel } from "@material-ui/core";

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
  TableButton: {
    marginTop: theme.spacing(2),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
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
  table: {
    minWidth: 400,
  },
}));

interface SearchForm {
  title: string;
}
interface Props {
  userSignedIn: boolean;
}

let flag: boolean;

const Main: React.FC<Props> = ({ userSignedIn }: Props) => {
  let cards: any;
  let col_row: any;
  let collections : any = [];

  const [SearchForm, setSearchForm] = useState<SearchForm>({
    title: "",
  });

  const [open, setOpen] = useState(false);
  const handleClickOpen = (book_id) => {

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  function getCollections(){
      $.ajax({
            async: false,
            url: "http://localhost:8000/api/user/my_profile",
            method: "GET",
            data: {
                auth: token,
            },
            success: function (data) {
                if (data != null) {
                    if (data.message == "Got current user profile data") {
                        collections = data.collection_list;
                    }else{
                        alert(data.message);
                    }
                }
            },
            error: function (error) {
                console.log("Server error!");
            },
        });
  }



  function addLib(id) {
    console.log(id);
    $.ajax({
      async: false,
      url: "http://localhost:8000/api/collections/add_to_library",
      data: {
        auth: token,
        id: id,
      },
      method: "POST",
      success: function (data) {
        console.log(data);
        if (data.message == "Book added to library") {
         
          alert("Book Successfully added to library");
        } else {
          alert(data.message);
        }
      },
      error: function () {
        console.log("server error!");
       
      },
    });
  }

  const onTextboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchForm((prevSearchForm) => {
      return {
        ...prevSearchForm,
        [name]: value,
      };
    });
  };

  function searchLocal(event) {
    window.location.href = "/search?title=" + SearchForm.title;
  }

  function searchWeb(event) {
    window.location.href = "/extsearch?title=" + SearchForm.title;
  }

  function request() {
    var data = randomBooks(function (data) {
      if (data != null) {
        console.log(data);
        cards = data.book_list;
      } else {
        alert("Something Wrong!");
        window.location.href = "/";
      }
    });
  }

  function randomBooks(callback) {
    $.ajax({
      async: false,
      url: "http://localhost:8000/api/books/random",
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
      },
    });
  }

  function requestMove() {
    var data = retrieveCollections(function (data) {
      if (data != null) {
        console.log("get collection_list");
        console.log(data.collection_list);
        col_row = data.collection_list;
        //moveCollection(); //function called to POST request
      } else {
        //TO DO: gracefully inform user needs to create a collection first
        window.location.href = "/";
      }
    });
  }
  //TODO cannot use my profile to get collections as book cannot exist in the collection alrdy
  function retrieveCollections(callback) {
    $.ajax({
      async: false,
      url: "http://localhost:8000/api/user/my_profile",
      method: "GET",
      data: {
        auth: token,
      },
      success: function (data) {
        if (data != null) {
          if (data.message == "Got current user profile data") {
            callback(data);
          } else {
            callback(null);
          }
        }
      },
      error: function (error) {
        callback(error);
        console.log("Server error!");
      },
    });
  }

  function moveCollection() {
    handleClose();
    var data = requestCollectionMove(function (data) {
      if (data != null) {
      } else {
        //TO DO: gracefully inform user needs to create a collection first
        window.location.href = "/";
      }
    });
  }

  function requestCollectionMove(callback) {
    //TODO AFTER API BUILT: POST request to store the book in collection
  }

  const classes = Style();
  const token = CookieService.get("access_token");

  // State for the expandable search menu.
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

  const [checked, setChecked ] = useState(true);

  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
  }

  request();
  requestMove(); // have to run beforehand due to async

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
              ReadRecommend
            </Typography>
            <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
            >
              A seamless platform for book lovers to explore personalized book
              recommendations.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                {userSignedIn ? null : (
                  <Grid item>
                    <Button
                      component={Router.Link}
                      to="/auth/signup"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Sign up for free!
                    </Button>
                  </Grid>
                )}

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
                    <IconButton
                        type="submit"
                        onClick={searchLocal}
                        className={classes.iconButton}
                        aria-label="search"
                    >
                      <SearchIcon />
                    </IconButton>

                    <IconButton
                        type="submit"
                        onClick={searchWeb}
                        className={classes.iconButton}
                        aria-label="search"
                    >
                      <LanguageIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {[classes.expandOpen]: expanded})}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                  </Paper>
                    <Grid>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <Grid item>
                                <Box m={2}>
                                    <Typography gutterBottom>Filter By Minimum Rating</Typography>
                                    <Slider 
                                        value={typeof minimumRating === 'number' ? minimumRating : 0}
                                        onChange={handleSliderChange}
                                        aria-labelledby="input-slider"
                                        min={0} max={5} step={0.1}
                                        marks={marks}
                                    />
                                    <Input 
                                        className={classes.input} 
                                        value={minimumRating} 
                                        margin="dense"
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        inputProps={{step: 0.1, min: 0, max: 5, type: 'number', 'aria-labelledby': 'input-slider'}}
                                    />
                                </Box>
                                <Box m={1}>
                                    <FormControlLabel 
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={handleCheckedChange}
                                                color="default"
                                                inputProps={{'aria-label': 'checkbox with default color'}}
                                            />
                                        }
                                        label="Apply Minimum Average Rating"
                                    />
                                </Box>
                            </Grid>
                            <Grid item>
                                
                            </Grid>
                        </Collapse>

                    </Grid>
                </Grid>

              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.book_id} xs={12} sm={6} md={4}>
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
                    <Typography>Published On: {card.book_pub_date}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      component={Router.Link}
                      to={"/bookdata/metadata?id=" + card.book_id}
                    >
                      View
                    </Button>
                    {userSignedIn ? (
                      <Button
                        size="small"
                        color="primary"
                        endIcon={<AddIcon />}
                        onClick={() => addLib(card.book_id)}
                      >
                        {" "}
                        Add to Libary{" "}
                      </Button>
                    ) : null}
                    {/*userSignedIn ? (
                      <Button
                        size="small"
                        color="primary"
                        endIcon={<AddIcon />}
                        onClick={() => handleClickOpen(card.book_id)}
                      >
                        {" "}
                        Add to Collection{" "}
                      </Button>
                    ) : null*/}

                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="form-dialog-title"
                    >
                      <DialogTitle id="form-dialog-title">
                        Specify a collection to move to:
                      </DialogTitle>
                      <DialogContent>
                        <TableContainer>
                          <Table
                            className={classes.table}
                            aria-label="simple table"
                          >
                            {/* <TableHead>
                                                            <TableRow>
                                                                <TableCell>Collection List</TableCell>
                                                            </TableRow>
                                                        </TableHead> */}
                            <TableBody>
                              {/*col_row.map((row) => (
                                <TableRow key={row.collection_id}>
                                  <TableCell component="th" scope="row">
                                    {row.collection_name}
                                  </TableCell>
                                  <button
                                    className={classes.TableButton}
                                    onClick={moveCollection}
                                  >
                                    {" "}
                                    Move{" "}
                                  </button>
                                </TableRow>
                            ))*/}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>
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

export default Main;

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];
