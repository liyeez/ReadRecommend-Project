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
// Material UI
const Add_1 = __importDefault(require("@material-ui/icons/Add"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const CardActions_1 = __importDefault(require("@material-ui/core/CardActions"));
const CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
const CardMedia_1 = __importDefault(require("@material-ui/core/CardMedia"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const FormGroup_1 = __importDefault(require("@material-ui/core/FormGroup"));
const FormControlLabel_1 = __importDefault(require("@material-ui/core/FormControlLabel"));
const Switch_1 = __importDefault(require("@material-ui/core/Switch"));
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
}));
let readStatus = [];
function UserLibrary() {
    const classes = Style();
    const token = CookieService_1.default.get("access_token");
    const [libraryReadStatuses, setLibraryReadStatuses] = react_1.useState([]);
    const [statusChanged, setStatusChanged] = react_1.useState(false);
    let cards = [];
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
            url: "http://localhost:8000/api/collections/delete_from_library",
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
                    cards = data.book_list;
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
            url: "http://localhost:8000/api/user/get_library",
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
    function initialiseReadStatus(bookId) {
        let status = false;
        var data = getReadStatus(bookId, function (data) {
            status = data.is_read;
        });
        return status;
    }
    function getReadStatus(bookId, callback) {
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/books/is_read",
            data: {
                auth: token,
                book_id: bookId
            },
            method: "GET",
            success: function (data) {
                if (data != null) {
                    console.log(data.is_read);
                    callback(data);
                }
                else {
                    callback(null);
                }
            },
            error: function () {
                console.log("server error!");
                callback(null);
            }
        });
    }
    // Toggles the read status of a book in a user's library between read and unread.
    function toggleRead(bookId) {
        var data = setReadStatus(bookId, function (data) {
            setStatusChanged(!statusChanged);
        });
    }
    function setReadStatus(bookId, callback) {
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/books/set_read",
            data: {
                auth: token,
                book_id: bookId,
            },
            method: "POST",
            success: function (data) {
                if (data != null) {
                    console.log(data.message);
                    callback(data);
                }
                else {
                    callback(null);
                }
            },
            error: function () {
                console.log("server error!");
                callback(null);
            }
        });
    }
    request();
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
                react_1.default.createElement(Grid_1.default, { container: true, spacing: 4 }, cards.map((card) => (react_1.default.createElement(Grid_1.default, { item: true, key: card.id, xs: 12, sm: 6, md: 4 },
                    react_1.default.createElement(Card_1.default, { className: classes.card },
                        react_1.default.createElement(CardMedia_1.default, { className: classes.cardMedia, image: "https://source.unsplash.com/random", title: "Image title" }),
                        react_1.default.createElement(CardContent_1.default, { className: classes.cardContent },
                            react_1.default.createElement(Typography_1.default, { gutterBottom: true, variant: "h5", component: "h2" }, card.book_title),
                            react_1.default.createElement(FormGroup_1.default, { row: true },
                                react_1.default.createElement(FormControlLabel_1.default, { control: react_1.default.createElement(Switch_1.default, { checked: initialiseReadStatus(card.id), onChange: () => toggleRead(card.id), color: "primary" }), label: "Read Status" })),
                            react_1.default.createElement(Typography_1.default, null,
                                "By Author: ",
                                card.book_author),
                            react_1.default.createElement(Typography_1.default, null,
                                "Published on: ",
                                card.book_pub_date)),
                        react_1.default.createElement(CardActions_1.default, null,
                            react_1.default.createElement(Button_1.default, { component: Router.Link, to: "/bookdata/metadata?id=" + card.id, size: "small", color: "primary" }, "View"),
                            react_1.default.createElement(Button_1.default, { size: "small", color: "primary", onClick: () => removeBook(card.id) }, "Remove"),
                            react_1.default.createElement(Button_1.default, { size: "small", color: "primary" }, "Move to Collection")))))))))));
}
exports.default = UserLibrary;
//# sourceMappingURL=UserLibrary.js.map