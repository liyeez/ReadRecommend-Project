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
const AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
const Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const styles_1 = require("@material-ui/core/styles");
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const CardActions_1 = __importDefault(require("@material-ui/core/CardActions"));
const CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
const CardMedia_1 = __importDefault(require("@material-ui/core/CardMedia"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const SentimentVeryDissatisfied_1 = __importDefault(require("@material-ui/icons/SentimentVeryDissatisfied"));
const styles = styles_1.makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(16),
        paddingRight: theme.spacing(4),
    },
    paper: {
        align: 'center',
        width: '900px',
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    contentWrapper: {
        margin: '40px 16px',
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
}));
// export interface ContentProps extends WithStyles<typeof styles> {}
const FindUser = ({}) => {
    const classes = styles();
    const [SearchForm, setSearchForm] = react_1.useState({
        title: '',
    });
    const onTextboxChange = (e) => {
        const { name, value } = e.target;
        setSearchForm(prevSearchForm => {
            return Object.assign(Object.assign({}, prevSearchForm), { [name]: value });
        });
    };
    function preventDefault(event) {
        event.preventDefault;
        window.location.href = "/user/findusers?" + SearchForm.title;
    }
    let results = false;
    let txt = "";
    let users = [];
    function onSearch() {
        $.ajax({
            async: false,
            url: API_URL + "/api/user/find_users",
            data: {
                search: txt,
            },
            method: "GET",
            success: function (data) {
                console.log(data);
                if (data != null) {
                    if (data.message != "No matches found") {
                        results = true;
                        console.log(data);
                        users = data.user_list;
                    }
                }
            },
            error: function () {
                console.log("server error!");
            },
        });
    }
    let array = window.location.href.split("?");
    if (array.length > 1) {
        console.log("looking for user: " + array[1]);
        let searchstr = array[1].split("%20");
        if (searchstr.length > 0) {
            for (let i = 0; i < searchstr.length; i++) {
                txt = txt.concat(searchstr[i]);
                if (i != array.length - 1) {
                    txt = txt.concat(" ");
                }
            }
        }
        else {
            txt = array[1];
        }
        onSearch();
    }
    function viewUser(id) {
        window.location.href = "/user/otherusers?userid=" + id;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement(Grid_1.default, { container: true, spacing: 3, className: classes.container },
            react_1.default.createElement(Paper_1.default, { className: classes.paper },
                react_1.default.createElement(AppBar_1.default, { className: classes.searchBar, position: "static", color: "default", elevation: 0 },
                    react_1.default.createElement(Toolbar_1.default, null,
                        react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, alignItems: "center" },
                            react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
                                react_1.default.createElement(TextField_1.default, { fullWidth: true, InputProps: {
                                        disableUnderline: true,
                                        className: classes.searchInput,
                                    }, value: SearchForm.title, name: "title", label: "Search by email address or name....", onChange: onTextboxChange })),
                            react_1.default.createElement(Grid_1.default, { item: true },
                                react_1.default.createElement(Button_1.default, { variant: "contained", color: "primary", className: classes.addUser, onClick: preventDefault }, "Search"))))))),
        react_1.default.createElement(Container_1.default, { className: classes.cardGrid, maxWidth: "md" },
            results
                ? (null)
                : (react_1.default.createElement(Typography_1.default, { align: 'center', component: "h5", color: "textSecondary" },
                    react_1.default.createElement(SentimentVeryDissatisfied_1.default, null),
                    "No matches found")),
            react_1.default.createElement(Grid_1.default, { container: true, spacing: 4 }, users.map((card) => (react_1.default.createElement(Grid_1.default, { item: true, key: card, xs: 12, sm: 6, md: 4 },
                react_1.default.createElement(Card_1.default, { className: classes.card },
                    react_1.default.createElement(CardMedia_1.default, { className: classes.cardMedia, image: "https://source.unsplash.com/random?book", title: "Image title" }),
                    react_1.default.createElement(CardContent_1.default, { className: classes.cardContent },
                        react_1.default.createElement(Typography_1.default, { gutterBottom: true, variant: "h5", component: "h2" }, card.first_name + " " + card.last_name)),
                    react_1.default.createElement(CardActions_1.default, null,
                        react_1.default.createElement(Button_1.default, { size: "small", color: "primary", onClick: () => viewUser(card.user_id) }, "View"))))))))));
};
exports.default = FindUser;
//# sourceMappingURL=FindUser.js.map