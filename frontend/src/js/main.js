"use strict";
// Main.tsx
// Main page
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
const $ = require("jquery");
const react_1 = __importStar(require("react"));
const Router = __importStar(require("react-router-dom"));
const CookieService_1 = __importDefault(require("../services/CookieService"));
// Material UI
const Add_1 = __importDefault(require("@material-ui/icons/Add"));
const Alert_1 = __importDefault(require("@material-ui/lab/Alert"));
const Box_1 = __importDefault(require("@material-ui/core/Box"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const CardActions_1 = __importDefault(require("@material-ui/core/CardActions"));
const CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
const CardMedia_1 = __importDefault(require("@material-ui/core/CardMedia"));
const Collapse_1 = __importDefault(require("@material-ui/core/Collapse"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
const DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
const DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
const DialogContentText_1 = __importDefault(require("@material-ui/core/DialogContentText"));
const DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
const FilterList_1 = __importDefault(require("@material-ui/icons/FilterList"));
const FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const Input_1 = __importDefault(require("@material-ui/core/Input"));
const InputLabel_1 = __importDefault(require("@material-ui/core/InputLabel"));
const Language_1 = __importDefault(require("@material-ui/icons/Language"));
const LibraryAdd_1 = __importDefault(require("@material-ui/icons/LibraryAdd"));
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const Search_1 = __importDefault(require("@material-ui/icons/Search"));
const Select_1 = __importDefault(require("@material-ui/core/Select"));
const Slider_1 = __importDefault(require("@material-ui/core/Slider"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/core/styles");
// Marks for filter slider.
const marks = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
];
const Style = styles_1.makeStyles((theme) => ({
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
        paddingTop: "56.25%",
    },
    cardContent: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
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
let bookToAdd;
const Main = ({ userSignedIn }) => {
    let cards;
    let collections = [];
    const [SearchForm, setSearchForm] = react_1.useState({
        title: "",
    });
    const [addDialogIsOpen, setAddDialogIsOpen] = react_1.useState(false);
    let [userBookCollections, setUserBookCollections] = react_1.useState([]);
    const [addToCollectionId, setAddToCollectionId] = react_1.useState("");
    const [addToCollectionError, setAddToCollectionError] = react_1.useState("");
    const handleClickOpen = (bookId) => {
        bookToAdd = bookId;
        setAddDialogIsOpen(true);
    };
    const handleAddDialogClose = () => {
        setAddDialogIsOpen(false);
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
    function addBookToCollection(bookId, collectionId) {
        handleAddDialogClose();
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
    function getCollections() {
        $.ajax({
            async: false,
            url: API_URL + "/api/user/my_profile",
            method: "GET",
            data: {
                auth: token,
            },
            success: function (data) {
                if (data != null) {
                    if (data.message == "Got current user profile data") {
                        collections = data.collection_list;
                    }
                    else {
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
        $.ajax({
            async: false,
            url: API_URL + "/api/collections/add_to_library",
            data: {
                auth: token,
                id: id,
            },
            method: "POST",
            success: function (data) {
                if (data != null) {
                    if (data.message == "Book added to library") {
                        alert("Book Successfully added to library");
                    }
                    else {
                        alert(data.message);
                    }
                }
            },
            error: function () {
                console.log("server error!");
            },
        });
    }
    const onTextboxChange = (e) => {
        const { name, value } = e.target;
        setSearchForm((prevSearchForm) => {
            return Object.assign(Object.assign({}, prevSearchForm), { [name]: value });
        });
    };
    function request() {
        var data = randomBooks(function (data) {
            if (data != null) {
                cards = data.book_list;
            }
            else {
                alert("Something Wrong!");
                window.location.href = "/";
            }
        });
    }
    function randomBooks(callback) {
        $.ajax({
            async: false,
            url: API_URL + "/api/books/random",
            data: {
                count: 12,
            },
            method: "GET",
            success: function (data) {
                if (data != null) {
                    if (data.message == "Got random books") {
                        callback(data);
                    }
                    else {
                        callback(null);
                    }
                }
            },
            error: function () {
                console.log("server error!");
                callback(null);
            },
        });
    }
    //TODO cannot use my profile to get collections as book cannot exist in the collection alrdy
    function retrieveCollections(callback) {
        $.ajax({
            async: false,
            url: API_URL + "/api/user/my_profile",
            method: "GET",
            data: {
                auth: token,
            },
            success: function (data) {
                if (data != null) {
                    if (data.message == "Got current user profile data") {
                        callback(data);
                    }
                    else {
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
    const classes = Style();
    const token = CookieService_1.default.get("access_token");
    // State for the expandable search menu.
    const [expanded, setExpanded] = react_1.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [minimumRating, setMinimumRating] = react_1.default.useState(0);
    const handleSliderChange = (event, newValue) => {
        setMinimumRating(newValue);
    };
    const handleInputChange = (event) => {
        setMinimumRating(event.target.value === '' ? '' : Number(event.target.value));
    };
    const handleBlur = () => {
        if (minimumRating < 0) {
            setMinimumRating(0);
        }
        else if (minimumRating > 5) {
            setMinimumRating(5);
        }
    };
    const [filterState, setFilterState] = react_1.useState({
        minimumTotalRatings: 0,
        minimumReadCount: 0,
        minimumCollectionCount: 0,
    });
    const handleFilterChange = (event) => {
        setFilterState(Object.assign(Object.assign({}, filterState), { [event.target.name]: event.target.value }));
    };
    function advSearchLocal(event) {
        window.location.href = "/search?title=" + SearchForm.title + "?average_rating=" + minimumRating +
            "?total_ratings=" + filterState.minimumTotalRatings + "?read_count=" + filterState.minimumReadCount +
            "?collection_count=" + filterState.minimumCollectionCount;
    }
    function searchLocal(event) {
        window.location.href = "/search?title=" + SearchForm.title;
    }
    function searchWeb(event) {
        window.location.href = "/extsearch?title=" + SearchForm.title + "?index=0";
    }
    request();
    if (userSignedIn) {
        requestUserCollections();
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement("main", null,
            react_1.default.createElement("div", { className: classes.heroContent },
                react_1.default.createElement(Container_1.default, { maxWidth: "sm" },
                    react_1.default.createElement(Typography_1.default, { component: "h1", variant: "h2", align: "center", color: "textPrimary", gutterBottom: true }, "ReadRecommend"),
                    react_1.default.createElement(Typography_1.default, { variant: "h5", align: "center", color: "textSecondary", paragraph: true }, "A seamless platform for book lovers to explore personalized book recommendations."),
                    react_1.default.createElement("div", { className: classes.heroButtons },
                        react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, justify: "center" },
                            userSignedIn ? null : (react_1.default.createElement(Grid_1.default, { item: true },
                                react_1.default.createElement(Button_1.default, { component: Router.Link, to: "/auth/signup", type: "submit", variant: "contained", color: "primary" }, "Sign up for free!"))),
                            userSignedIn
                                ? (react_1.default.createElement(Grid_1.default, { item: true },
                                    react_1.default.createElement(Paper_1.default, { className: classes.root },
                                        react_1.default.createElement(TextField_1.default, { className: classes.input, placeholder: "Find a Book", value: SearchForm.title, name: "title", label: "Search ReadRecommend", onChange: onTextboxChange }),
                                        react_1.default.createElement(IconButton_1.default, { type: "submit", onClick: searchLocal, className: classes.iconButton, "aria-label": "search" },
                                            react_1.default.createElement(Search_1.default, null)),
                                        react_1.default.createElement(IconButton_1.default, { type: "submit", onClick: searchWeb, className: classes.iconButton, "aria-label": "search" },
                                            react_1.default.createElement(Language_1.default, null)),
                                        react_1.default.createElement(IconButton_1.default, { className: clsx_1.default(classes.expand, { [classes.expandOpen]: expanded }), onClick: handleExpandClick, "aria-expanded": expanded, "aria-label": "show more" },
                                            react_1.default.createElement(FilterList_1.default, null))),
                                    react_1.default.createElement(Paper_1.default, null,
                                        react_1.default.createElement(Grid_1.default, null,
                                            react_1.default.createElement(Collapse_1.default, { in: expanded, timeout: "auto", unmountOnExit: true },
                                                react_1.default.createElement(Grid_1.default, { item: true },
                                                    react_1.default.createElement(Box_1.default, { m: 2 },
                                                        react_1.default.createElement(Typography_1.default, { id: "input-slider", gutterBottom: true }, "Filter By Minimum Rating"),
                                                        react_1.default.createElement(Slider_1.default, { value: typeof minimumRating === 'number' ? minimumRating : 0, onChange: handleSliderChange, "aria-labelledby": "input-slider", min: 0, max: 5, step: 1, marks: marks }),
                                                        react_1.default.createElement(Input_1.default, { className: classes.input, value: minimumRating, margin: "dense", onChange: handleInputChange, onBlur: handleBlur, inputProps: { step: 1, min: 0, max: 5, type: 'number', 'aria-labelledby': 'input-slider' } })),
                                                    react_1.default.createElement(Box_1.default, { m: 2 },
                                                        react_1.default.createElement(TextField_1.default, { id: "minimumTotalRatings", name: "minimumTotalRatings", label: "Minimum Total Ratings", type: "number", value: filterState.minimumTotalRatings, onChange: handleFilterChange })),
                                                    react_1.default.createElement(Box_1.default, { m: 2 },
                                                        react_1.default.createElement(TextField_1.default, { id: "minimumReadCount", name: "minimumReadCount", label: "Minimum Read Count", type: "number", value: filterState.minimumReadCount, onChange: handleFilterChange })),
                                                    react_1.default.createElement(Box_1.default, { m: 2 },
                                                        react_1.default.createElement(TextField_1.default, { id: "minimumCollectionCount", name: "minimumCollectionCount", label: "Minimum Collection Count", type: "number", value: filterState.minimumCollectionCount, onChange: handleFilterChange }))),
                                                react_1.default.createElement(Grid_1.default, { item: true },
                                                    react_1.default.createElement(Box_1.default, { m: 2 },
                                                        react_1.default.createElement(Button_1.default, { color: "primary", onClick: advSearchLocal }, "Advanced Search"))))))))
                                : (null))))),
            react_1.default.createElement(Container_1.default, { className: classes.cardGrid, maxWidth: "md" },
                react_1.default.createElement("div", null,
                    addToCollectionError === "Successfully added title to collection!" ?
                        (react_1.default.createElement(Alert_1.default, { severity: "success" }, addToCollectionError)) : null,
                    addToCollectionError === "This book is already in the requested collection!" ?
                        (react_1.default.createElement(Alert_1.default, { severity: "warning" }, addToCollectionError)) : null),
                react_1.default.createElement(Grid_1.default, { container: true, spacing: 4 }, cards === null || cards === void 0 ? void 0 : cards.map((book) => (react_1.default.createElement(Grid_1.default, { item: true, key: book.book_id, xs: 12, sm: 6, md: 4 },
                    react_1.default.createElement(Card_1.default, { className: classes.card },
                        react_1.default.createElement(CardMedia_1.default, { className: classes.cardMedia, image: "https://source.unsplash.com/random?book", title: "Image title" }),
                        react_1.default.createElement(CardContent_1.default, { className: classes.cardContent },
                            react_1.default.createElement(Typography_1.default, { gutterBottom: true, variant: "h5", component: "h2" }, book.book_title),
                            react_1.default.createElement(Typography_1.default, null,
                                "By Author: ",
                                book.book_author),
                            react_1.default.createElement(Typography_1.default, null,
                                "Published On: ",
                                book.book_pub_date)),
                        react_1.default.createElement(CardActions_1.default, null,
                            react_1.default.createElement(Button_1.default, { size: "small", color: "primary", component: Router.Link, to: "/bookdata/metadata?id=" + book.book_id }, "View"),
                            userSignedIn ? (react_1.default.createElement(Button_1.default, { size: "small", color: "primary", startIcon: react_1.default.createElement(Add_1.default, null), onClick: () => addLib(book.book_id) },
                                " ",
                                "Libary",
                                " ")) : null,
                            userSignedIn ? (react_1.default.createElement(Button_1.default, { name: book.book_id, size: "small", type: "submit", color: "primary", onClick: () => handleClickOpen(book.book_id), startIcon: react_1.default.createElement(LibraryAdd_1.default, null) }, "Collection")) : null,
                            react_1.default.createElement(Dialog_1.default, { open: addDialogIsOpen, onClose: handleAddDialogClose, "aria-labelledby": "form-dialog-title" },
                                react_1.default.createElement(DialogTitle_1.default, { id: "form-dialog-title" }, "Add Book To Collection"),
                                react_1.default.createElement(DialogContent_1.default, null,
                                    react_1.default.createElement(DialogContentText_1.default, null, "Select a book collection:"),
                                    react_1.default.createElement(FormControl_1.default, { variant: "outlined", className: classes.formControl, fullWidth: true },
                                        react_1.default.createElement(InputLabel_1.default, { id: "add-to-collection" }, "Book Collection"),
                                        react_1.default.createElement(Select_1.default, { labelId: "add-to-collection-label", id: "add-to-collection-options", color: "primary", value: addToCollectionId, onChange: handleChange, label: "collectionName", fullWidth: true },
                                            react_1.default.createElement(MenuItem_1.default, { value: "" },
                                                react_1.default.createElement("em", null, "Book Collection")), userBookCollections === null || userBookCollections === void 0 ? void 0 :
                                            userBookCollections.map((userBookCollection) => (react_1.default.createElement(MenuItem_1.default, { key: userBookCollection.collection_id, value: userBookCollection.collection_id }, userBookCollection.collection_name)))))),
                                react_1.default.createElement(DialogActions_1.default, null,
                                    react_1.default.createElement(Button_1.default, { onClick: handleAddDialogClose, color: "primary" }, "Cancel"),
                                    react_1.default.createElement(Button_1.default, { onClick: () => addBookToCollection(bookToAdd, addToCollectionId), color: "primary", variant: "contained" }, "Save")))))))))))));
};
exports.default = Main;
//# sourceMappingURL=main.js.map