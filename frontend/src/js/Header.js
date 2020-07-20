"use strict";
// Header.tsx
// Implements the header sitewide
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
const react_1 = __importDefault(require("react"));
const Router = __importStar(require("react-router-dom"));
const CookieService_1 = __importDefault(require("../services/CookieService"));
// Material UI
const AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const CollectionsBookmark_1 = __importDefault(require("@material-ui/icons/CollectionsBookmark"));
const Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const styles_1 = require("@material-ui/core/styles");
// Page imports
const Sidebar_1 = __importDefault(require("./Sidebar"));
const userSignedIn = false;
const drawerWidth = 240;
const Style = styles_1.makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
}));
function handleLogout() {
    const tokenToRemove = CookieService_1.default.get('access_token');
    console.log(tokenToRemove);
    // Remove 'access_token' cookie on frontend using CookieService.
    CookieService_1.default.remove('access_token');
    console.log("is this working?");
    // Remove cookie on backend.
    $.ajax({
        url: "http://localhost:8000/api/auth/signout",
        method: "POST",
        data: {
            token: tokenToRemove,
        },
        success: function (data) {
            console.log("Logged out");
        },
        error: function () {
            console.log("server error!");
        }
    });
    window.location.href = "/";
    //window.location.reload();
}
const Header = ({ userSignedIn }) => {
    const classes = Style();
    // Determine whether a user is signed in by checking for 'access_token' cookie.
    const token = CookieService_1.default.get('access_token');
    if (token) {
        userSignedIn = true;
    }
    else {
        userSignedIn = false;
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(AppBar_1.default, { position: "relative", className: classes.appBar },
            react_1.default.createElement(Toolbar_1.default, null,
                react_1.default.createElement(Typography_1.default, { variant: "h6", color: "inherit", noWrap: true },
                    react_1.default.createElement(Button_1.default, { component: Router.Link, to: "/", color: "inherit", startIcon: react_1.default.createElement(CollectionsBookmark_1.default, null) })),
                (userSignedIn) ? (react_1.default.createElement(Button_1.default, { component: Router.Link, to: "/", color: "inherit", onClick: handleLogout }, "Logout"))
                    : (react_1.default.createElement(Button_1.default, { component: Router.Link, to: "/auth/signin", color: "inherit" }, "Login")))),
        (userSignedIn) ? (react_1.default.createElement(Sidebar_1.default, null)) : (null)));
};
exports.default = Header;
//# sourceMappingURL=Header.js.map