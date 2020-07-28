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
const AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
const Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const styles_1 = require("@material-ui/core/styles");
const Search_1 = __importDefault(require("@material-ui/icons/Search"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
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
        window.location.href = "/search?finduser=" + SearchForm.title;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement(Grid_1.default, { container: true, spacing: 3, className: classes.container },
            react_1.default.createElement(Paper_1.default, { className: classes.paper },
                react_1.default.createElement(AppBar_1.default, { className: classes.searchBar, position: "static", color: "default", elevation: 0 },
                    react_1.default.createElement(Toolbar_1.default, null,
                        react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, alignItems: "center" },
                            react_1.default.createElement(Grid_1.default, { item: true },
                                react_1.default.createElement(Search_1.default, { className: classes.block, color: "inherit" })),
                            react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
                                react_1.default.createElement(TextField_1.default, { fullWidth: true, InputProps: {
                                        disableUnderline: true,
                                        className: classes.searchInput,
                                    }, value: SearchForm.title, name: "title", label: "Search by email address or name....", onChange: onTextboxChange })),
                            react_1.default.createElement(Grid_1.default, { item: true },
                                react_1.default.createElement(Button_1.default, { variant: "contained", color: "primary", className: classes.addUser, onClick: preventDefault }, "Search")))))))));
};
exports.default = FindUser;
//# sourceMappingURL=FindUser.js.map