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
    const [openReview, setOpenReview] = react_1.useState(false);
    const [newReview, setReview] = react_1.useState("");
    const [newRating, setRating] = react_1.useState(2);
    const [hover, setHover] = react_1.default.useState(-1);
    const handleClickOpen = () => {
        setOpenReview(true);
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
            console.log(data);
            if (data != null && data.message == "Got matching reviews") {
                reviews = data.review_list;
            }
        });
    }
    // fix after jiayi free
    // function readFlag(){
    //   console.log("checking if user read it, book_id: " + book.book_id);
    //   var res = isRead(function (res) {
    //     console.log(res.message);
    //     if (res.message == "Success") {
    //        res = true;
    //     } 
    //   });
    // }
    function onReviews(callback) {
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/reviews/get_reviews",
            data: {
                id: book.book_id,
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
    function isRead(callback) {
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/books/is_read",
            data: {
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
                console.log("server error!");
                callback(null);
            },
        });
    }
    function Review() {
        // Closes dialog box.
        handleClose();
        console.log("recorded review: " + newReview + " rating: " + newRating);
        var data = addReview(newReview, newRating, function (data) {
            if (data != null) {
                console.log(data.message);
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
    const token = CookieService.get("access_token");
    function addReview(review, rating, callback) {
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/reviews/new_review",
            data: {
                auth: token,
                id: book.book_id,
                review: review,
                rating: rating,
            },
            method: "POST",
            success: function (data) {
                if (data != null) {
                    console.log(data.message);
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
    //readFlag();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Typography_1.default, { component: "h2", variant: "h6", color: "primary", gutterBottom: true }, "Reviews"),
        react_1.default.createElement(Table_1.default, { size: "small" },
            react_1.default.createElement(TableHead_1.default, null,
                react_1.default.createElement(TableRow_1.default, null,
                    react_1.default.createElement(TableCell_1.default, null, "Comments"),
                    react_1.default.createElement(TableCell_1.default, { align: "right" }, "Rating"))),
            react_1.default.createElement(TableBody_1.default, null, reviews.map((row) => (react_1.default.createElement(TableRow_1.default, { key: row.id },
                react_1.default.createElement(TableCell_1.default, null, row.review),
                react_1.default.createElement(TableCell_1.default, { align: "right" }, row.rating)))))),
        react_1.default.createElement("div", { className: classes.seeMore },
            react_1.default.createElement(Button_1.default, { color: "primary", href: "#", onClick: preventDefault }, "More reviews..."),
            react_1.default.createElement(Button_1.default, { color: "primary", href: "#", onClick: handleClickOpen }, "Write a review"),
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