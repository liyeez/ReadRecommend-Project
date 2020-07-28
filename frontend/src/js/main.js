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
const Table_1 = __importDefault(require("@material-ui/core/Table"));
const TableBody_1 = __importDefault(require("@material-ui/core/TableBody"));
const TableContainer_1 = __importDefault(require("@material-ui/core/TableContainer"));
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
const DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
const DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
const DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
const Add_1 = __importDefault(require("@material-ui/icons/Add"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const CardActions_1 = __importDefault(require("@material-ui/core/CardActions"));
const CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
const CardMedia_1 = __importDefault(require("@material-ui/core/CardMedia"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const Search_1 = __importDefault(require("@material-ui/icons/Search"));
const Language_1 = __importDefault(require("@material-ui/icons/Language"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const styles_1 = require("@material-ui/core/styles");
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
let flag;
const Main = ({ userSignedIn }) => {
    let cards;
    let col_row;
    let collections = [];
    const [SearchForm, setSearchForm] = react_1.useState({
        title: "",
    });
    const [open, setOpen] = react_1.useState(false);
    const handleClickOpen = (book_id) => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    function getCollections() {
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
                }
                else {
                    alert(data.message);
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
            url: "http://localhost:8000/api/books/random",
            data: {
                count: 12,
            },
            method: "GET",
            success: function (data) {
                console.log(data.message);
                if (data.message == "Got random books") {
                    callback(data);
                }
                else {
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
            }
            else {
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
    function moveCollection() {
        handleClose();
        var data = requestCollectionMove(function (data) {
            if (data != null) {
            }
            else {
                //TO DO: gracefully inform user needs to create a collection first
                window.location.href = "/";
            }
        });
    }
    function requestCollectionMove(callback) {
        //TODO AFTER API BUILT: POST request to store the book in collection
    }
    const classes = Style();
    const token = CookieService_1.default.get("access_token");
    request();
    requestMove(); // have to run beforehand due to async
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
                            react_1.default.createElement(Grid_1.default, { item: true },
                                react_1.default.createElement(Paper_1.default, { className: classes.root },
                                    react_1.default.createElement(TextField_1.default, { className: classes.input, placeholder: "Find a Book", value: SearchForm.title, name: "title", label: "Search ReadRecommend", onChange: onTextboxChange }),
                                    react_1.default.createElement(IconButton_1.default, { type: "submit", onClick: searchLocal, className: classes.iconButton, "aria-label": "search" },
                                        react_1.default.createElement(Search_1.default, null)),
                                    react_1.default.createElement(IconButton_1.default, { type: "submit", onClick: searchWeb, className: classes.iconButton, "aria-label": "search" },
                                        react_1.default.createElement(Language_1.default, null)))))))),
            react_1.default.createElement(Container_1.default, { className: classes.cardGrid, maxWidth: "md" },
                react_1.default.createElement(Grid_1.default, { container: true, spacing: 4 }, cards.map((card) => (react_1.default.createElement(Grid_1.default, { item: true, key: card.book_id, xs: 12, sm: 6, md: 4 },
                    react_1.default.createElement(Card_1.default, { className: classes.card },
                        react_1.default.createElement(CardMedia_1.default, { className: classes.cardMedia, image: "https://source.unsplash.com/random?book", title: "Image title" }),
                        react_1.default.createElement(CardContent_1.default, { className: classes.cardContent },
                            react_1.default.createElement(Typography_1.default, { gutterBottom: true, variant: "h5", component: "h2" }, card.book_title),
                            react_1.default.createElement(Typography_1.default, null,
                                "By Author: ",
                                card.book_author),
                            react_1.default.createElement(Typography_1.default, null,
                                "Published On: ",
                                card.book_pub_date)),
                        react_1.default.createElement(CardActions_1.default, null,
                            react_1.default.createElement(Button_1.default, { size: "small", color: "primary", component: Router.Link, to: "/bookdata/metadata?id=" + card.book_id }, "View"),
                            userSignedIn ? (react_1.default.createElement(Button_1.default, { size: "small", color: "primary", endIcon: react_1.default.createElement(Add_1.default, null), onClick: () => addLib(card.book_id) },
                                " ",
                                "Add to Libary",
                                " ")) : null,
                            react_1.default.createElement(Dialog_1.default, { open: open, onClose: handleClose, "aria-labelledby": "form-dialog-title" },
                                react_1.default.createElement(DialogTitle_1.default, { id: "form-dialog-title" }, "Specify a collection to move to:"),
                                react_1.default.createElement(DialogContent_1.default, null,
                                    react_1.default.createElement(TableContainer_1.default, null,
                                        react_1.default.createElement(Table_1.default, { className: classes.table, "aria-label": "simple table" },
                                            react_1.default.createElement(TableBody_1.default, null)))),
                                react_1.default.createElement(DialogActions_1.default, null,
                                    react_1.default.createElement(Button_1.default, { onClick: handleClose, color: "primary" }, "Cancel")))))))))))));
};
exports.default = Main;
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
//# sourceMappingURL=main.js.map