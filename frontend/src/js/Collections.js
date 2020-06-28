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
const react_1 = __importDefault(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const styles_1 = require("@material-ui/core/styles");
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const CardActionArea_1 = __importDefault(require("@material-ui/core/CardActionArea"));
const CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
const CardMedia_1 = __importDefault(require("@material-ui/core/CardMedia"));
const Hidden_1 = __importDefault(require("@material-ui/core/Hidden"));
const Router = __importStar(require("react-router-dom"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const useStyles = styles_1.makeStyles({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
});
// todo in future: do ajax request from Recommend algot
function RecommendBook(props) {
    const classes = useStyles();
    const { collection } = props;
    return (react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 6 },
        react_1.default.createElement(CardActionArea_1.default, { component: "a", href: "#" },
            react_1.default.createElement(Card_1.default, { className: classes.card },
                react_1.default.createElement("div", { className: classes.cardDetails },
                    react_1.default.createElement(CardContent_1.default, null,
                        react_1.default.createElement(Typography_1.default, { component: "h2", variant: "h5" }, collection.title),
                        react_1.default.createElement(Typography_1.default, { variant: "subtitle1", color: "textSecondary" }, collection.date),
                        react_1.default.createElement(Typography_1.default, { variant: "subtitle1", paragraph: true }, collection.description),
                        react_1.default.createElement(Button_1.default, { size: "small", color: "primary", component: Router.Link, to: "/user/usercollections" },
                            react_1.default.createElement(Typography_1.default, { variant: "subtitle1", color: "primary" }, "View Collection")))),
                react_1.default.createElement(Hidden_1.default, { xsDown: true },
                    react_1.default.createElement(CardMedia_1.default, { className: classes.cardMedia, image: collection.image, title: collection.imageTitle }))))));
}
exports.default = RecommendBook;
RecommendBook.propTypes = {
    collection: prop_types_1.default.object,
};
//# sourceMappingURL=Collections.js.map