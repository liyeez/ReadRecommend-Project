"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const $ = require("jquery");
const styles_1 = require("@material-ui/core/styles");
const Table_1 = __importDefault(require("@material-ui/core/Table"));
const TableBody_1 = __importDefault(require("@material-ui/core/TableBody"));
const TableCell_1 = __importDefault(require("@material-ui/core/TableCell"));
const TableHead_1 = __importDefault(require("@material-ui/core/TableHead"));
const TableRow_1 = __importDefault(require("@material-ui/core/TableRow"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
const DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
const DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
const DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
const Rating_1 = __importDefault(require("@material-ui/lab/Rating"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const Box_1 = __importDefault(require("@material-ui/core/Box"));
const CookieService_1 = __importDefault(require("../services/CookieService"));
// Generate Order Data
function createData(id, date, name, country, comment, rating) {
    return { id, date, name, country, comment, rating };
}
const labels = {
    0: 'Worst',
    1: 'Useless+',
    2: 'Poor+',
    3: 'Ok+',
    4: 'Good+',
    5: 'Excellent+',
};
function preventDefault(event) {
    event.preventDefault();
}
const useStyles = styles_1.makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    ratingStyle: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
}));
function Reviews(props) {
    let reviews = [];
    let { book } = props;
    let read = false;
    let currentUserID;
    let reviewFlag = false;
    const token = CookieService_1.default.get("access_token");
    const [openReview, setOpenReview] = react_1.useState(false);
    const [newReview, setReview] = react_1.useState("");
    const [newRating, setRating] = react_1.useState(2);
    const [hover, setHover] = react_1.default.useState(-1);
    function isReviewed() {
        getReviews();
        for (var rev of reviews) {
            console.log(rev.user + " " + currentUserID);
            if (rev.user == currentUserID) {
                reviewFlag = true; //just to prevent user from writing >1 review
            }
        }
    }
    const handleClickOpen = () => {
        readFlag();
        console.log("reviewFlag & read: " + reviewFlag + read);
        if (!reviewFlag && read) { // if the user not commented and has read book
            setOpenReview(true);
        }
        else {
            alert("Please mark the book as read in your library before reviewing!");
        }
    };
    const handleClose = () => {
        setOpenReview(false);
    };
    // Detects new value typed into dialog box and loads it on the screen.
    const onTextChange = (e) => {
        const { name, value } = e.target;
        setReview(value);
    };
    function getReviews() {
        console.log("getting reviews... book:" + book);
        var data = onReviews(function (data) {
            if (data != null && data.message == "Got matching reviews") {
                currentUserID = data.currentUser;
                reviews = data.review_list;
                console.log("recorded: " + currentUserID + " " + reviews);
            }
            else {
                console.log('did not return any reviews');
            }
        });
    }
    function readFlag() {
        var res = isRead(function (res) {
            if (res != null && res.message == "Success") {
                read = res.is_read;
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
                }
                else {
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
    function removeReview(callback) {
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/reviews/remove_review",
            data: {
                auth: token,
                id: book.book_id,
            },
            method: "POST",
            success: function (data) {
                if (data != null && data.message == "review successfully deleted") {
                    console.log("removeReview: " + data.message);
                    alert("You've removed your review!");
                    window.location.reload();
                }
                else {
                    alert(data.message);
                }
            },
            error: function () {
                console.log("server error in removeReview!");
            },
        });
    }
    const classes = useStyles();
    isReviewed(); //check is user commented alrdy (get all reviews as well)
    readFlag(); //check if user read the book in library
    console.log("checking reviewed; " + reviewFlag);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Typography_1.default, { component: "h2", variant: "h6", color: "primary", gutterBottom: true }, "Reviews"),
        react_1.default.createElement(Table_1.default, { size: "small" },
            react_1.default.createElement(TableHead_1.default, null,
                react_1.default.createElement(TableRow_1.default, null,
                    react_1.default.createElement(TableCell_1.default, null, "Reader"),
                    react_1.default.createElement(TableCell_1.default, null, "Comments"),
                    react_1.default.createElement(TableCell_1.default, { align: "right" }, "Rating"))),
            react_1.default.createElement(TableBody_1.default, null, reviews.map((row) => (react_1.default.createElement(TableRow_1.default, { key: row.id },
                react_1.default.createElement(TableCell_1.default, null, row.user),
                react_1.default.createElement(TableCell_1.default, null, row.review),
                react_1.default.createElement(TableCell_1.default, { align: "right" },
                    react_1.default.createElement(Rating_1.default, { name: "half-rating-read", value: row.rating, precision: 1, readOnly: true }))))))),
        react_1.default.createElement("div", { className: classes.seeMore },
            reviewFlag
                ? (react_1.default.createElement(Button_1.default, { color: "primary", href: "#", onClick: removeReview }, "Remove your review"))
                : (react_1.default.createElement(Button_1.default, { color: "primary", href: "#", onClick: handleClickOpen }, "Write a review")),
            react_1.default.createElement(Dialog_1.default, { open: openReview, onClose: handleClose, "aria-labelledby": "form-dialog-title" },
                react_1.default.createElement(DialogTitle_1.default, { id: "form-dialog-title" }, "Write your thoughts..."),
                react_1.default.createElement(DialogContent_1.default, null,
                    react_1.default.createElement(TextField_1.default, { autoFocus: true, margin: "dense", id: "name", label: "Review", type: "text", fullWidth: true, onChange: onTextChange }),
                    react_1.default.createElement("div", { className: classes.ratingStyle },
                        react_1.default.createElement(Rating_1.default, { name: "hover-feedback", value: newRating, precision: 1, onChange: (event, newRating) => {
                                if (newRating != null) {
                                    setRating(newRating);
                                }
                            }, onChangeActive: (event, newHover) => {
                                setHover(newHover);
                            } }),
                        newRating !== null && react_1.default.createElement(Box_1.default, { ml: 2 }, labels[hover !== -1 ? hover : newRating]))),
                react_1.default.createElement(DialogActions_1.default, null,
                    react_1.default.createElement(Button_1.default, { onClick: handleClose, color: "primary" }, "Cancel"),
                    react_1.default.createElement(Button_1.default, { onClick: Review, color: "primary", variant: "contained" }, "Save"))))));
}
exports.default = Reviews;
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
//# sourceMappingURL=Reviews.js.map