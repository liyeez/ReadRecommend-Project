// EditCollection.tsx
// A page where users can edit a previously created collection.

import React, { ChangeEvent, useState } from "react";
import * as Router from "react-router-dom";
import * as $ from "jquery";
import CookieService from "../services/CookieService";

// Material UI
import Alert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import HistoryIcon from "@material-ui/icons/History";
import IconButton from "@material-ui/core/IconButton";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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
  chip: {
    margin: theme.spacing(0.5),
  },
  chipRoot: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

interface Props {}

let book_list: any;
let tag_list: any[] = [];
let collection: any;

function viewBook(data) {
  window.location.href = "/bookdata/metadata?isbn=" + data;
}

const EditCollection: React.FC<Props> = ({}) => {
  const classes = Style();
  // For editing the collection's title.
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  // For editing the collection's tag.
  const [tagDialog, setTagOpen] = useState(false);
  const [newTag, setNewTag] = useState("");

  // For dialog component
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTagOpen = () => {
    setTagOpen(true);
  };

  const handleTagClose = () => {
    setTagOpen(false);
  };

  // Detects new value typed into dialog box and loads it on the screen.
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTitle(value);
  };

  // Detects new value typed into dialog box and loads it on the screen.
  const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTag(value);
  };

  // Collection Data. TODO: Add more fields.
  const [collectionData, setCollectionData] = useState({
    collectionTitle: "",
    collectionTag: "",
    editCollectionError: "",
  });

  // Tags are represented using the Chip Material UI component.
  const [chipData, setChipData] = useState([
    { key: 0, tag_label: "Fiction" },
    { key: 1, tag_label: "Fantasy" },
    { key: 2, tag_label: "Action" },
    { key: 3, tag_label: "Thriller" },
  ]);

  //Deletes a tag from the array of the collection's tags.
  const handleDelete = (chipToDelete) => () => {
    removeTag(chipToDelete.tag_label);
  };

  function addTag() {
    // Closes dialog box.
    handleTagClose();

    // Changes the collection title on the front-end display.
    setCollectionData((prevCollectionData) => {
      return {
        ...prevCollectionData,
        collectionTag: newTag,
      };
    });

    var data = setCollectionTag(newTag, function (data) {
      if (data != null) {
        console.log(data.message);
        if (data.message == "Tag successfully added to collection") {
          // setChipData((chips) => chips.concat({key: chipData.length, tag_label:newTag}));
        } else if (data.message == "Collection already has this tag") {
          window.location.href = "/";
        } else {
          alert("Tag weird error!");
          window.location.href = "/";
        }
      }
    });
  }

  // Retrieves collection data from the back-end/database.
  function request() {
    var data = getBooks(function (data) {
      if (data != null) {
        if (data.message == "Collection data delivered") {
          book_list = data.book_list;
          collection = data.collection_name;
        } else {
          alert("No Matched Results!");
          window.location.href = "/";
        }
      }
    });
  }

  function requestTags() {
    var result = getTags(function (result) {
      if (result != null) {
        if (result.message == "Got tags") {
          let newTags: any[] = [];
          result.tag_list.forEach(function (tag) {
            let Tag = { key: newTags.length, tag_label: tag.tag_label };
            newTags.push(Tag);
          });
          tag_list = newTags;
        } else if (result.message == "Collection has no tags") {
          console.log("Do nothing, continue loading the page.");
        } else {
          alert("No Matched Results!");
          window.location.href = "/";
        }
      }
    });
  }

  function getBooks(callback) {
    $.ajax({
      async: false,
      url: "http://localhost:8000/api/collections/view_collection",
      data: {
        collection_id: collectionId,
      },
      method: "GET",
      success: function (data) {
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

  function getTags(callback) {
    $.ajax({
      async: false,
      url: "http://localhost:8000/api/collections/get_tags",
      data: {
        collection_id: collectionId,
      },
      method: "GET",
      success: function (data) {
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

  // Renames collection title on both front-end and back-end.
  function setCollectionTitle() {
    // Closes dialog box.
    handleClose();

    // Changes the collection title on the front-end display.
    setCollectionData((prevCollectionData) => {
      return {
        ...prevCollectionData,
        collectionTitle: newTitle,
      };
    });

    // Change the collection title in the back-end/database.
    $.ajax({
      async: false,
      url: "http://localhost:8000/api/collections/rename",
      data: {
        auth: token,
        collection_id: collectionId,
        collection_name: newTitle,
      },
      method: "POST",
      success: function (data) {
        if (data.message === "Collection successfully renamed") {
          setCollectionData((prevCollectionData) => {
            return {
              ...prevCollectionData,
              editCollectionError: "Collection successfully renamed!",
            };
          });
        } else if (
          data.message === "Collection with the same name already exists"
        ) {
          setCollectionData((prevCollectionData) => {
            return {
              ...prevCollectionData,
              editCollectionError:
                "Collection with the same name already exists!",
            };
          });
        }
      },
      error: function () {
        console.log("server error!");
      },
    });
  }

  // Adds collection tag on both front-end and back-end.
  function setCollectionTag(newTag, callback) {
    // Change the collection title in the back-end/database.
    $.ajax({
      async: false,
      url: "http://localhost:8000/api/collections/add_tag",
      data: {
        collection_id: collectionId,
        tag_label: newTag,
      },
      method: "POST",
      success: function (data) {
        if (data != null) {
          console.log(data.message);
          callback(data);
        }
      },
      error: function () {
        console.log("server error!");
      },
    });
  }

  // Removes book from collection on both front-end and back-end.
  function removeTag(tag_label) {
    console.log("Remove tag from collection.");
    $.ajax({
      async: false,
      url: "http://localhost:8000/api/collections/delete_tag",
      data: {
        collection_id: collectionId,
        tag_label: tag_label,
      },
      method: "POST",
      success: function (data) {
        if (data.message == "Tag successfully removed from collection") {
          console.log(data.message);
          window.location.reload();
        } else if (data.message == "Tag not found") {
          console.log(data.message);
        }
      },
      error: function () {
        console.log("server error!");
      },
    });
  }

  // Removes book from collection on both front-end and back-end.
  function removeBook(isbnToRemove) {
    console.log("Remove book from collection.");
    $.ajax({
      async: false,
      url: "http://localhost:8000/api/collections/delete_title",
      data: {
        auth: token,
        collection_id: collectionId,
        isbn: isbnToRemove,
      },
      method: "POST",
      success: function (data) {
        if (data.message == "Book removed from collection") {
          console.log("Successfully removed book from collection!");
          window.location.reload();
        }
      },
      error: function () {
        console.log("server error!");
      },
    });
  }

  // TODO: Implement functionality. Gets the 10 most recently added books to the collection.
  function getRecentlyAddedBooks() {
    console.log("Get 10 most recently added books!");
  }

  let collectionId = window.location.href.split("?")[1];
  collectionId = collectionId.split("=")[1];
  const token = CookieService.get("access_token");
  request();
  requestTags();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Grid>
              {/*User Feedback*/}
              <div>
                {collectionData.editCollectionError ===
                "Collection with the same name already exists!" ? (
                  <Alert severity="error">
                    {collectionData.editCollectionError}
                  </Alert>
                ) : null}
                {collectionData.editCollectionError ===
                "Collection successfully renamed!" ? (
                  <Alert severity="success">
                    {collectionData.editCollectionError}
                  </Alert>
                ) : null}
              </div>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {collection}
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClickOpen}
                  startIcon={<EditIcon />}
                >
                  Rename Collection
                </Button>
              </Typography>

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Rename Collection
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter a new title for your collection.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Collection Title"
                    type="text"
                    fullWidth
                    onChange={onTitleChange}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={setCollectionTitle}
                    color="primary"
                    variant="contained"
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Paper component="ul" className={classes.chipRoot}>
              {tag_list.map((data) => {
                return (
                  <li key={data.key}>
                    <Chip
                      label={data.tag_label}
                      onDelete={handleDelete(data)}
                      className={classes.chip}
                    />
                  </li>
                );
              })}
            </Paper>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    onClick={handleTagOpen}
                    type="submit"
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                  >
                    Add Tags
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    component={Router.Link}
                    to={"/user/addTitles?collectionid=" + collectionId}
                    type="submit"
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                  >
                    Add Books
                  </Button>

                  <Dialog
                    open={tagDialog}
                    onClose={handleTagClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      Add New Tag
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Enter a new tag for your collection.
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Collection Tag"
                        type="text"
                        fullWidth
                        onChange={onTagChange}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleTagClose} color="primary">
                        Cancel
                      </Button>
                      <Button
                        onClick={addTag}
                        color="primary"
                        variant="contained"
                      >
                        Save
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    startIcon={<HistoryIcon />}
                  >
                    Recently Added Books
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="outlined"
                    color="default"
                    startIcon={<ImportExportIcon />}
                  >
                    Import Books
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="outlined"
                    color="default"
                    startIcon={<ImportExportIcon />}
                  >
                    Export Books
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {book_list.map((card) => (
              <Grid item key={card.isbn} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random?book"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam molestie pellentesque tortor in rhoncus.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => viewBook(card.isbn)}
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      component={Router.Link}
                      to="/bookdata/metadata"
                    >
                      Edit Status
                    </Button>
                    {/* TODO: Display an alert saying 'book removed from collection' */}
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => removeBook(card.isbn)}
                    >
                      Remove
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

export default EditCollection;
