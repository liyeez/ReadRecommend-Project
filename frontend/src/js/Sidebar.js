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
// Sidebar.tsx
// User sidebar which is rendered when a user is signed in.
const react_1 = __importDefault(require("react"));
const Router = __importStar(require("react-router-dom"));
const List_1 = __importDefault(require("@material-ui/core/List"));
const ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
const ListItemIcon_1 = __importDefault(require("@material-ui/core/ListItemIcon"));
const ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
const LibraryBooks_1 = __importDefault(require("@material-ui/icons/LibraryBooks"));
const LocalLibrary_1 = __importDefault(require("@material-ui/icons/LocalLibrary"));
const Home_1 = __importDefault(require("@material-ui/icons/Home"));
const People_1 = __importDefault(require("@material-ui/icons/People"));
const styles_1 = require("@material-ui/core/styles");
const drawerWidth = 240;
const Style = styles_1.makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}));
// 
const Sidebar = ({}) => {
    const classes = Style();
    const theme = styles_1.useTheme();
    return (react_1.default.createElement("div", { className: classes.drawerContainer },
        react_1.default.createElement(List_1.default, null,
            react_1.default.createElement(ListItem_1.default, { button: true, key: 'Home Page', component: Router.Link, to: "/" },
                react_1.default.createElement(ListItemIcon_1.default, null,
                    react_1.default.createElement(Home_1.default, null)),
                react_1.default.createElement(ListItemText_1.default, { primary: 'Home Page' })),
            react_1.default.createElement(ListItem_1.default, { button: true, key: 'My Library', component: Router.Link, to: "/user/userlibrary" },
                react_1.default.createElement(ListItemIcon_1.default, null,
                    react_1.default.createElement(LocalLibrary_1.default, null)),
                react_1.default.createElement(ListItemText_1.default, { primary: 'My Library' })),
            react_1.default.createElement(ListItem_1.default, { button: true, key: 'Find Users', component: Router.Link, to: "/user/findusers" },
                react_1.default.createElement(ListItemIcon_1.default, null,
                    react_1.default.createElement(People_1.default, null)),
                react_1.default.createElement(ListItemText_1.default, { primary: 'Find Users' })),
            react_1.default.createElement(ListItem_1.default, { button: true, key: "My Profile", component: Router.Link, to: "/user/profile" },
                react_1.default.createElement(ListItemIcon_1.default, null,
                    react_1.default.createElement(LibraryBooks_1.default, null)),
                react_1.default.createElement(ListItemText_1.default, { primary: 'My Profile' })))));
};
exports.default = Sidebar;
//# sourceMappingURL=Sidebar.js.map