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
const SentimentSatisfiedAlt_1 = __importDefault(require("@material-ui/icons/SentimentSatisfiedAlt"));
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const Search_1 = __importDefault(require("@material-ui/icons/Search"));
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
}));
const Search = ({}) => {
    const classes = Style();
    const token = CookieService_1.default.get("access_token");
    const [SearchForm, setSearchForm] = react_1.useState({
        title: "",
    });
    function newSearch(event) {
        event.preventDefault();
        let s = (`${encodeURIComponent(SearchForm.title)}`);
        window.location.href = "/keyword?string=" + s;
    }
    const onTextboxChange = (e) => {
        const { name, value } = e.target;
        setSearchForm((prevSearchForm) => {
            return Object.assign(Object.assign({}, prevSearchForm), { [name]: value });
        });
    };
    function viewBook(data) {
        window.location.href = "/bookdata/metadata?id=" + data;
    }
    let str = '';
    let href = `${decodeURIComponent(window.location.href)}`;
    console.log(href);
    if (href.split("?")[1]) {
        str = href.split("?")[1];
        str = str.split("=")[1]; //get keyword
    }
    let books;
    let flag = false;
    function keywordSearch() {
        console.log('search for: ' + str);
        $.ajax({
            async: false,
            url: API_URL + "/api/books/keyword",
            data: {
                auth: token,
                keyword: str,
            },
            method: "GET",
            success: function (data) {
                console.log(data);
                if (data.message == 'Found matches') {
                    console.log(data);
                    books = data.book_list;
                    flag = true;
                }
                else {
                    books = [];
                }
            },
            error: function () {
                console.log("server error!");
            },
        });
    }
    keywordSearch();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement("main", null,
            react_1.default.createElement("div", { className: classes.heroContent },
                react_1.default.createElement(Container_1.default, { maxWidth: "sm" },
                    react_1.default.createElement(Typography_1.default, { component: "h1", variant: "h2", align: "center", color: "textPrimary", gutterBottom: true }, "Keyword Search"),
                    react_1.default.createElement(Typography_1.default, { component: "h3", variant: "h5", align: "center", color: "textSecondary", gutterBottom: true },
                        "Find a book with a keyword \"",
                        str,
                        "\""),
                    react_1.default.createElement("div", { className: classes.heroButtons },
                        react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, justify: "center" },
                            react_1.default.createElement(Grid_1.default, { item: true },
                                react_1.default.createElement(Paper_1.default, { component: "form", className: classes.root },
                                    react_1.default.createElement(TextField_1.default, { className: classes.input, value: SearchForm.title, name: "title", label: "Search ReadRecommend", onChange: onTextboxChange }),
                                    react_1.default.createElement(IconButton_1.default, { type: "submit", className: classes.iconButton, "aria-label": "search", onClick: newSearch },
                                        react_1.default.createElement(Search_1.default, null)))))))),
            flag
                ? (react_1.default.createElement(Container_1.default, { className: classes.cardGrid, maxWidth: "md" },
                    react_1.default.createElement(Grid_1.default, { container: true, spacing: 4 }, books.map((book) => (react_1.default.createElement(Grid_1.default, { item: true, key: book, xs: 12, sm: 6, md: 4 },
                        react_1.default.createElement(Card_1.default, { className: classes.card },
                            react_1.default.createElement(CardMedia_1.default, { className: classes.cardMedia, image: "https://source.unsplash.com/random?book", title: "Image title" }),
                            react_1.default.createElement(CardContent_1.default, { className: classes.cardContent },
                                react_1.default.createElement(Typography_1.default, { gutterBottom: true, variant: "h5", component: "h2" }, book.book_title),
                                react_1.default.createElement(Typography_1.default, null,
                                    "By Author: ",
                                    book.book_author),
                                react_1.default.createElement(Typography_1.default, null,
                                    "Published on: ",
                                    book.book_pub_date)),
                            react_1.default.createElement(CardActions_1.default, null,
                                react_1.default.createElement(Button_1.default, { size: "small", color: "primary", onClick: () => viewBook(book.book_id) }, "View")))))))))
                : (react_1.default.createElement(Typography_1.default, { align: 'center', component: "h5", color: "textSecondary" },
                    react_1.default.createElement(SentimentSatisfiedAlt_1.default, null),
                    '      ',
                    "What books you feel like today?")))));
};
exports.default = Search;
//# sourceMappingURL=Keyword.js.map