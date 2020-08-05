"use strict";
// RecentlyAddedBooks.tsx
// Displays the top 10 most recently added books to a collection.
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
const react_1 = __importDefault(require("react"));
const Router = __importStar(require("react-router-dom"));
const $ = __importStar(require("jquery"));
const ArrowBackIos_1 = __importDefault(require("@material-ui/icons/ArrowBackIos"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const CardActions_1 = __importDefault(require("@material-ui/core/CardActions"));
const CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
const CardMedia_1 = __importDefault(require("@material-ui/core/CardMedia"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
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
    buttons: {
        paddingLeft: theme.spacing(2),
    }
}));
let collectionId = window.location.href.split("?")[1];
if (collectionId) {
    collectionId = collectionId.split("=")[1];
}
let recently_added_books = [];
const RecentlyAddedBooks = ({}) => {
    const classes = Style();
    // Retrieve the collection's top 10 most recently added books.
    function requestRecentlyAddedBooks() {
        var data = getRecentlyAddedBooks(function (data) {
            if (data != null) {
                recently_added_books = data.book_list;
            }
        });
    }
    // Performs Ajax call to retrieve the collection's top 10 most recently added books.
    function getRecentlyAddedBooks(callback) {
        $.ajax({
            async: false,
            url: API_URL + "/api/collections/recent_added",
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
                console.log("Server error!");
                callback(null);
            },
        });
    }
    requestRecentlyAddedBooks();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement("main", null,
            react_1.default.createElement("div", { className: classes.heroContent },
                react_1.default.createElement(Container_1.default, { maxWidth: "sm" },
                    react_1.default.createElement(Grid_1.default, null,
                        react_1.default.createElement(Typography_1.default, { component: "h1", variant: "h2", align: "center", color: "textPrimary", gutterBottom: true }, "Recently Added Books"),
                        react_1.default.createElement("div", { className: classes.heroButtons },
                            react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, justify: "center" },
                                react_1.default.createElement(Grid_1.default, { item: true },
                                    react_1.default.createElement(Button_1.default, { variant: "outlined", color: "default", component: Router.Link, to: "/user/editcollection?collectionid=" + collectionId, startIcon: react_1.default.createElement(ArrowBackIos_1.default, null) }, "Back to Editing")),
                                react_1.default.createElement(Grid_1.default, { item: true },
                                    react_1.default.createElement(Button_1.default, { className: "buttons", variant: "outlined", color: "default", component: Router.Link, to: "/user/viewcollection?collectionid=" + collectionId, startIcon: react_1.default.createElement(ArrowBackIos_1.default, null) }, "Back to Viewing")))))),
                console.log(recently_added_books),
                react_1.default.createElement(Container_1.default, { className: classes.cardGrid, maxWidth: "md" },
                    react_1.default.createElement(Grid_1.default, { container: true, spacing: 4 }, recently_added_books.map((book) => (react_1.default.createElement(Grid_1.default, { item: true, key: book.id, xs: 12, sm: 6, md: 4 },
                        react_1.default.createElement(Card_1.default, { className: classes.card },
                            react_1.default.createElement(CardMedia_1.default, { className: classes.cardMedia, image: "https://source.unsplash.com/random?book", title: "Image Title" }),
                            react_1.default.createElement(CardContent_1.default, { className: classes.cardContent },
                                react_1.default.createElement(Typography_1.default, { gutterBottom: true, variant: "h5", component: "h2" }, book.title)),
                            react_1.default.createElement(CardActions_1.default, null,
                                react_1.default.createElement(Button_1.default, { component: Router.Link, to: "/bookdata/metadata?isbn=" + book.id, size: "small", color: "primary" }, "View"))))))))))));
};
exports.default = RecentlyAddedBooks;
//# sourceMappingURL=RecentlyAddedBooks.js.map