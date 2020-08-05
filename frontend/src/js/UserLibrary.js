"use strict";
// UserLibary.tsx
// User Libary page
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
const $ = __importStar(require("jquery"));
const Router = __importStar(require("react-router-dom"));
const CookieService_1 = __importDefault(require("../services/CookieService"));
const BookReadStatus_1 = __importDefault(require("./BookReadStatus"));
// Material UI
const Add_1 = __importDefault(require("@material-ui/icons/Add"));
const Alert_1 = __importDefault(require("@material-ui/lab/Alert"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const CardActions_1 = __importDefault(require("@material-ui/core/CardActions"));
const CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
const CardMedia_1 = __importDefault(require("@material-ui/core/CardMedia"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
const DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
const DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
const DialogContentText_1 = __importDefault(require("@material-ui/core/DialogContentText"));
const DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
const FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const InputLabel_1 = __importDefault(require("@material-ui/core/InputLabel"));
const LibraryAdd_1 = __importDefault(require("@material-ui/icons/LibraryAdd"));
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const Select_1 = __importDefault(require("@material-ui/core/Select"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const styles_1 = require("@material-ui/core/styles");
const Style = styles_1.makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
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
        paddingTop: "56.25%",
    },
    cardContent: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
let bookToAdd;
function UserLibrary() {
    const classes = Style();
    const token = CookieService_1.default.get("access_token");
    let libraryBooks = [];
    let [userBookCollections, setUserBookCollections] = react_1.useState([]);
    const [addToCollectionId, setAddToCollectionId] = react_1.useState("");
    const [addToCollectionError, setAddToCollectionError] = react_1.useState("");
    const [open, setOpen] = react_1.useState(false);
    const handleClickOpen = (bookId) => {
        bookToAdd = bookId;
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        setAddToCollectionId(event.target.value);
    };
    function requestUserCollections() {
        var data = getUserCollections(function (data) {
            if (data != null) {
                userBookCollections = data.collection_list;
            }
        });
    }
    function getUserCollections(callback) {
        $.ajax({
            async: false,
            url: API_URL + "/api/user/my_profile",
            method: "GET",
            data: {
                auth: token,
            },
            success: function (data) {
                if (data != null) {
                    if (data.message === "Got current user profile data") {
                        callback(data);
                    }
                }
            },
            error: function (error) {
                callback(error);
                console.log("Get user collections server error!");
            }
        });
    }
    function removeBook(id) {
        var data = removeLib(id, function (data) {
            if (data != null) {
                if (data.message == "Book removed from library") {
                    window.location.href = "/user/userlibrary";
                }
                else {
                    alert("No Matched Results!");
                    window.location.href = "/";
                }
            }
        });
    }
    function removeLib(id, callback) {
        $.ajax({
            async: false,
            url: API_URL + "/api/collections/delete_from_library",
            data: {
                auth: token,
                id: id,
            },
            method: "POST",
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
    function request() {
        var data = onSearch(function (data) {
            if (data != null) {
                if (data.message == "Got user library") {
                    libraryBooks = data.book_list;
                }
                else {
                    alert("No Matched Results!");
                    window.location.href = "/";
                }
            }
        });
    }
    function onSearch(callback) {
        $.ajax({
            async: false,
            url: API_URL + "/api/user/get_library",
            data: {
                auth: token,
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
    function addBookToCollection(bookId, collectionId) {
        handleClose();
        $.ajax({
            async: false,
            url: API_URL + "/api/collections/add_title",
            data: {
                auth: token,
                collection_id: parseInt(collectionId),
                id: bookId,
            },
            method: "POST",
            success: function (data) {
                if (data != null) {
                    console.log(data);
                    if (data.message === "Book added to collection") {
                        setAddToCollectionError("Successfully added title to collection!");
                    }
                    else if (data.message === "Book is already in collection") {
                        setAddToCollectionError("This book is already in the requested collection!");
                    }
                }
            },
            error: function () {
                console.log("Add book to collection server error!");
            }
        });
    }
    request();
    requestUserCollections();
    console.log(userBookCollections);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement("main", null,
            react_1.default.createElement("div", { className: classes.heroContent },
                react_1.default.createElement(Container_1.default, { maxWidth: "md" },
                    react_1.default.createElement(Typography_1.default, { component: "h1", variant: "h2", align: "center", color: "textPrimary" }, "My Library"),
                    react_1.default.createElement("div", { className: classes.heroButtons },
                        react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, justify: "center" },
                            react_1.default.createElement(Grid_1.default, { item: true },
                                react_1.default.createElement(Button_1.default, { component: Router.Link, to: "/", type: "submit", variant: "contained", color: "primary", startIcon: react_1.default.createElement(Add_1.default, null) }, "Find More Books")))))),
            react_1.default.createElement(Container_1.default, { className: classes.cardGrid, maxWidth: "md" },
                react_1.default.createElement("div", null,
                    addToCollectionError === "Successfully added title to collection!" ?
                        (react_1.default.createElement(Alert_1.default, { severity: "success" }, addToCollectionError)) : null,
                    addToCollectionError === "This book is already in the requested collection!" ?
                        (react_1.default.createElement(Alert_1.default, { severity: "warning" }, addToCollectionError)) : null),
                react_1.default.createElement(Grid_1.default, { container: true, spacing: 4 }, libraryBooks.map((libraryBook) => (react_1.default.createElement(Grid_1.default, { item: true, key: libraryBook.id, xs: 12, sm: 6, md: 4 },
                    react_1.default.createElement(Card_1.default, { className: classes.card },
                        react_1.default.createElement(CardMedia_1.default, { className: classes.cardMedia, image: "https://source.unsplash.com/random", title: "Image title" }),
                        react_1.default.createElement(CardContent_1.default, { className: classes.cardContent },
                            react_1.default.createElement(Typography_1.default, { gutterBottom: true, variant: "h5", component: "h2" }, libraryBook.book_title),
                            react_1.default.createElement(BookReadStatus_1.default, { bookId: libraryBook.id }),
                            react_1.default.createElement(Typography_1.default, null,
                                "By Author: ",
                                libraryBook.book_author),
                            react_1.default.createElement(Typography_1.default, null,
                                "Published on: ",
                                libraryBook.book_pub_date)),
                        react_1.default.createElement(CardActions_1.default, null,
                            react_1.default.createElement(Button_1.default, { component: Router.Link, to: "/bookdata/metadata?id=" + libraryBook.id, size: "small", color: "primary" }, "View"),
                            react_1.default.createElement(Button_1.default, { size: "small", color: "primary", onClick: () => removeBook(libraryBook.id) }, "Remove"),
                            react_1.default.createElement(Button_1.default, { name: libraryBook.id, type: "submit", variant: "outlined", color: "primary", onClick: () => handleClickOpen(libraryBook.id), startIcon: react_1.default.createElement(LibraryAdd_1.default, null) }, "Add To"),
                            react_1.default.createElement(Dialog_1.default, { open: open, onClose: handleClose, "aria-labelledby": "form-dialog-title" },
                                react_1.default.createElement(DialogTitle_1.default, { id: "form-dialog-title" }, "Add Book To Collection"),
                                react_1.default.createElement(DialogContent_1.default, null,
                                    react_1.default.createElement(DialogContentText_1.default, null, "Select a book collection:"),
                                    react_1.default.createElement(FormControl_1.default, { variant: "outlined", className: classes.formControl, fullWidth: true },
                                        react_1.default.createElement(InputLabel_1.default, { id: "add-to-collection" }, "Book Collection"),
                                        react_1.default.createElement(Select_1.default, { labelId: "add-to-collection-label", id: "add-to-collection-options", color: "primary", value: addToCollectionId, onChange: handleChange, label: "collectionName", fullWidth: true },
                                            react_1.default.createElement(MenuItem_1.default, { value: "" },
                                                react_1.default.createElement("em", null, "Book Collection")),
                                            userBookCollections.map((userBookCollection) => (react_1.default.createElement(MenuItem_1.default, { key: userBookCollection.collection_id, value: userBookCollection.collection_id }, userBookCollection.collection_name)))))),
                                react_1.default.createElement(DialogActions_1.default, null,
                                    react_1.default.createElement(Button_1.default, { onClick: handleClose, color: "primary" }, "Cancel"),
                                    react_1.default.createElement(Button_1.default, { onClick: () => addBookToCollection(bookToAdd, addToCollectionId), color: "primary", variant: "contained" }, "Save")))))))))))));
}
exports.default = UserLibrary;
//# sourceMappingURL=UserLibrary.js.map