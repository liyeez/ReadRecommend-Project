"use strict";
// Footer.tsx
// Implements the footer sitewide
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const styles_1 = require("@material-ui/core/styles");
const Style = styles_1.makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    }
}));
function Footer() {
    const classes = Style();
    return (react_1.default.createElement("footer", { className: classes.footer },
        react_1.default.createElement(Typography_1.default, { variant: "h6", align: "center", gutterBottom: true }, "ReadRecommend"),
        react_1.default.createElement(Typography_1.default, { variant: "subtitle1", align: "center", color: "textSecondary", component: "p" }, "Books!"),
        react_1.default.createElement(Copyright, null)));
}
exports.default = Footer;
function Copyright() {
    return (react_1.default.createElement(Typography_1.default, { variant: "body2", color: "textSecondary", align: "center" },
        "Copyright © ",
        new Date().getFullYear(),
        "."));
}
//# sourceMappingURL=Footer.js.map