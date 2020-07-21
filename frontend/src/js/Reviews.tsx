
import React, { ChangeEvent, useState, useEffect } from "react";

import $ = require("jquery");
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Rating from '@material-ui/lab/Rating';
import TextField from "@material-ui/core/TextField";
import Box from '@material-ui/core/Box';
import CookieService from "../services/CookieService";
// Generate Order Data
function createData(id, date, name, country, comment, rating) {
  return { id, date, name, country, comment, rating };
}

const labels = {
  0:'Worst',
  1: 'Useless+',
  2: 'Poor+',
  3: 'Ok+',
  4: 'Good+',
  5: 'Excellent+',
};

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  ratingStyle: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function Reviews(props) {
  let reviews: Array<any> = [];
  let {book} = props;
  let read = false;
  let currentUserID: any;

  const token = CookieService.get("access_token");
  const [openReview, setOpenReview] = useState(false);
  const [newReview, setReview] = useState("");
  const [newRating, setRating] = useState(2);
  const [hover, setHover] = React.useState(-1);

  const handleClickOpen = () => {
    let flag = false;
    for (var rev of reviews) {
        if(parseInt(rev.user) == currentUserID){
            flag = true; //just to prevent user from writing >1 review
        }
    }
    if(!flag){
      setOpenReview(true);
    }else{
      alert("You have already reviewed this book!");
    }
  }
  
  const handleClose = () => {
    setOpenReview(false);
  }

  // Detects new value typed into dialog box and loads it on the screen.
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReview(value);
  };

  function getReviews() {
    console.log("getting reviews... book:" + book);
    
    var data = onReviews(function (data) {
      if (data != null && data.message == "Got matching reviews") {
        currentUserID = data.currentUser;
        reviews = data.review_list;
        console.log("recorded: " + currentUserID+" "+reviews);
      }else{
        console.log('did not return any reviews');
      }
    });
  }
  //fix after jiayi free
  function readFlag(){
    console.log("checking if user read it, book_id: " + book.book_id);
    
    var res = isRead(function (res) {
      if (res != null && res.message == "Success") {
        console.log(res);
        res = true;
      } 
    });
  }

  function onReviews(callback) {
    $.ajax({
      async: false,
      url: "http://localhost:8000/api/reviews/get_reviews",
      data: {
        auth: token,
        id: book.book_id,
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
        console.log("onReviews server error!");
        callback(null);
      },
    });
  }

  function isRead(callback) {
    $.ajax({
      async: false,
      url: "http://localhost:8000/api/books/is_read",
      data: {
        auth: token,
        book_id: book.book_id,
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
        console.log("isRead server error!");
        callback(null);
      },
    });
  }

  function Review() {
    // Closes dialog box.
    handleClose();
    console.log("recorded review: " + newReview + " rating: " + newRating + " for bookID: " + book.book_id);
    var data = addReview(function (data) {
      if (data != null) {
        
        if (data.message == "review successfully created") {
          window.location.href = "/bookdata/metadata?id=" + book.book_id;
        } else {
          alert("Review weird error!");
          window.location.href = "/bookdata/metadata?id=" + book.book_id;
        }
      }
    });
  }
  
  function addReview(callback) {
    $.ajax({
      async: false,
      url: "http://localhost:8000/api/reviews/new_review",
      data: {
        auth: token,
        id: book.book_id,
        review: newReview,
        rating: newRating,
      },
      method: "POST",
      success: function (data) {
        if (data != null) {
          console.log("addReview: " + data.message);
          callback(data);
        }
      },
      error: function () {
        console.log("server error in addReview!");
      },
    });
  }

  const classes = useStyles();
  getReviews();
  readFlag();
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Reviews
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Comments</TableCell>
            <TableCell align="right">Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.review}</TableCell>
              <TableCell align="right">
                   
                  <Rating
                    name="half-rating-read"
                    value={row.rating}
                    precision={1}  
                    readOnly
                  />
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Button color="primary" href="#" onClick={preventDefault}>
          More reviews...
        </Button>
        <Button color="primary" href="#" onClick={handleClickOpen}>
          Write a review
        </Button>

        <Dialog
          open={openReview}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Write your thoughts...</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Review"
              type="text"
              fullWidth
              onChange={onTextChange}
            />
            <div className={classes.ratingStyle}>
              <Rating
                name="hover-feedback"
                value={newRating}
                precision={1}
                onChange={(event, newRating) => {
                  if(newRating != null){
                    setRating(newRating);  
                  }
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />
              {newRating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : newRating]}</Box>}
            </div>
          </DialogContent>
          <DialogActions>
            
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={Review}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    </React.Fragment>
  );
}

// {userSignedIn ? (
//             <Button
//               size="small"
//               color="primary"
//               endIcon={<AddIcon />}
//               onClick={() => addBook(card.book_id)}
//             >
//               {" "}
//               Add to Libary{" "}
//             </Button>
//           ) : null}