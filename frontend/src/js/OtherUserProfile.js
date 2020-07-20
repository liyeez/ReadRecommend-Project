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
// Material UI
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const AccountCircle_1 = __importDefault(require("@material-ui/icons/AccountCircle"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const styles_1 = require("@material-ui/core/styles");
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const CardActions_1 = __importDefault(require("@material-ui/core/CardActions"));
const CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
const CardMedia_1 = __importDefault(require("@material-ui/core/CardMedia"));
const $ = __importStar(require("jquery"));
const useStyles = styles_1.makeStyles((theme) => ({
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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%',
    },
    cardContent: {
        flexGrow: 1,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(16),
    },
}));
function Profile() {
    const classes = useStyles();
    let cards;
    let str = window.location.href.split('?')[1];
    str = str.split('=')[1];
    console.log("To find: " + str);
    const [userForm, setUserForm] = react_1.useState({
        firstName: '',
        lastName: '',
    });
    function request() {
        var data = onSearch(function (data) {
            if (data.message == "Got user profile data") {
                cards = data.collection_list;
                userForm.firstName = data.first_name;
                userForm.lastName = data.last_name;
            }
            else {
                alert("No Matched Results!");
                window.location.href = '/';
            }
        });
    }
    function onSearch(callback) {
        $.ajax({
            async: false,
            url: 'http://localhost:8000/api/user/get_profile',
            data: {
                user_id: str,
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
            }
        });
    }
    function viewCollection(data) {
        window.location.href = "/user/viewcollection?collectionid=" + data;
    }
    request();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement("main", null,
            react_1.default.createElement("div", { className: classes.heroContent },
                react_1.default.createElement(Container_1.default, { maxWidth: "md" },
                    react_1.default.createElement(Grid_1.default, { container: true, spacing: 3, className: classes.container },
                        react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 8, lg: 9 },
                            react_1.default.createElement(Typography_1.default, { component: "h1", variant: "h2", align: "left", color: "textPrimary" },
                                react_1.default.createElement(IconButton_1.default, null,
                                    react_1.default.createElement(AccountCircle_1.default, { display: 'block', style: { fontSize: 100 }, color: "inherit" })),
                                userForm.firstName + " " + userForm.lastName))))),
            react_1.default.createElement(Container_1.default, { className: classes.cardGrid, maxWidth: "md" },
                react_1.default.createElement(Grid_1.default, { container: true, spacing: 4 }, cards.map((card) => (react_1.default.createElement(Grid_1.default, { item: true, key: card, xs: 12, sm: 6, md: 4 },
                    react_1.default.createElement(Card_1.default, { className: classes.card },
                        react_1.default.createElement(CardMedia_1.default, { className: classes.cardMedia, image: "https://source.unsplash.com/random", title: "Image title" }),
                        react_1.default.createElement(CardContent_1.default, { className: classes.cardContent },
                            react_1.default.createElement(Typography_1.default, { gutterBottom: true, variant: "h5", component: "h2" }, card.collection_name)),
                        react_1.default.createElement(CardActions_1.default, null,
                            react_1.default.createElement(Button_1.default, { size: "small", color: "primary", onClick: () => viewCollection(card.collection_id) }, "View"),
                            react_1.default.createElement(Button_1.default, { size: "small", color: "primary" }, "Import to My Collections")))))))))));
}
exports.default = Profile;
//# sourceMappingURL=OtherUserProfile.js.map