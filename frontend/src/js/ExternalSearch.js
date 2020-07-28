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
const $ = require("jquery");
const react_1 = __importStar(require("react"));
const CookieService_1 = __importDefault(require("../services/CookieService"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const CardActions_1 = __importDefault(require("@material-ui/core/CardActions"));
const CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
const CardMedia_1 = __importDefault(require("@material-ui/core/CardMedia"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const Search_1 = __importDefault(require("@material-ui/icons/Search"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Language_1 = __importDefault(require("@material-ui/icons/Language"));
const styles_1 = require("@material-ui/core/styles");
const token = CookieService_1.default.get("access_token");
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
    button: {
        paddingTop: '10%',
    },
}));
const Search = ({}) => {
    let extBooks = [];
    const classes = Style();
    const [SearchForm, setSearchForm] = react_1.useState({
        title: "",
    });
    const onTextboxChange = (e) => {
        const { name, value } = e.target;
        setSearchForm((prevSearchForm) => {
            return Object.assign(Object.assign({}, prevSearchForm), { [name]: value });
        });
    };
    function request() {
        var res = extSearch(function (res) {
            console.log(res);
            if (res != null && res.message == "Success") {
                extBooks = res.results;
            }
        });
    }
    function extSearch(callback) {
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/books/search_book",
            data: {
                auth: token,
                search: str,
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
                console.log("external search server error!");
                callback(null);
            },
        });
    }
    function storeBook(book) {
        console.log("In storeBook");
        console.log(book);
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/books/add_book",
            data: {
                auth: token,
                book_title: book.book_title,
                book_author: book.book_author,
                book_genre: book.book_genre,
                book_description: book.book_description,
                book_isbn: book.book_isbn,
                book_cover: book.cover,
                book_pub_date: book.book_pub_date,
            },
            method: "POST",
            success: function (data) {
                if (data != null) {
                    console.log("added book to library");
                    if (data.message == "Book already exists") {
                        window.location.href = "/bookdata/metadata?id=" + book.book_isbn;
                    }
                    else if (data.message == "Book added to system") {
                        window.location.href = "/bookdata/metadata?id=" + data.book_id;
                    }
                }
            },
            error: function () {
                console.log("storeBook server error!");
            },
        });
    }
    function localSearch(event) {
        event.preventDefault();
        window.location.href = "/search?title=" + SearchForm.title;
    }
    function externalSearch(event) {
        event.preventDefault();
        window.location.href = "/extsearch?title=" + SearchForm.title;
    }
    let str = window.location.href.split("?")[1];
    let type = str.split("=")[0];
    str = str.split("=")[1];
    console.log("To find ext: " + str + " of type: " + type);
    request();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement("main", null,
            react_1.default.createElement("div", { className: classes.heroContent },
                react_1.default.createElement(Container_1.default, { maxWidth: "sm" },
                    react_1.default.createElement(Typography_1.default, { component: "h1", variant: "h2", align: "center", color: "textPrimary", gutterBottom: true }, "External Search Results for"),
                    react_1.default.createElement(Typography_1.default, { component: "h1", variant: "h3", align: "center", color: "textSecondary", gutterBottom: true },
                        "\"",
                        str,
                        "\""),
                    react_1.default.createElement("div", { className: classes.heroButtons },
                        react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, justify: "center" },
                            react_1.default.createElement(Grid_1.default, { item: true },
                                react_1.default.createElement(Paper_1.default, { component: "form", className: classes.root },
                                    react_1.default.createElement(TextField_1.default, { className: classes.input, value: SearchForm.title, name: "title", label: "Search ReadRecommend", onChange: onTextboxChange }),
                                    react_1.default.createElement(IconButton_1.default, { type: "submit", className: classes.iconButton, "aria-label": "search", onClick: localSearch },
                                        react_1.default.createElement(Search_1.default, null)),
                                    react_1.default.createElement(IconButton_1.default, { type: "submit", className: classes.iconButton, "aria-label": "search", onClick: externalSearch },
                                        react_1.default.createElement(Language_1.default, null)))))))),
            react_1.default.createElement(Container_1.default, { className: classes.cardGrid, maxWidth: "md" },
                react_1.default.createElement(Grid_1.default, { container: true, spacing: 4 }, extBooks.map((card) => (react_1.default.createElement(Grid_1.default, { item: true, key: card, xs: 12, sm: 6, md: 4 },
                    react_1.default.createElement(Card_1.default, { className: classes.card },
                        react_1.default.createElement(CardMedia_1.default, { className: classes.cardMedia, image: "https://source.unsplash.com/random?book", title: "Image title" }),
                        react_1.default.createElement(CardContent_1.default, { className: classes.cardContent },
                            react_1.default.createElement(Typography_1.default, { gutterBottom: true, variant: "h5", component: "h2" }, card.book_title),
                            react_1.default.createElement(Typography_1.default, null,
                                "By Author: ",
                                card.book_author),
                            react_1.default.createElement(Typography_1.default, null,
                                "Published on: ",
                                card.book_pub_date)),
                        react_1.default.createElement(CardActions_1.default, null,
                            react_1.default.createElement(Button_1.default, { size: "small", color: "primary", onClick: () => storeBook(card) }, "View")))))))))));
};
exports.default = Search;
//# sourceMappingURL=ExternalSearch.js.map