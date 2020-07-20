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
const Router = __importStar(require("react-router-dom"));
const $ = __importStar(require("jquery"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const CardActionArea_1 = __importDefault(require("@material-ui/core/CardActionArea"));
const CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
const CardMedia_1 = __importDefault(require("@material-ui/core/CardMedia"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Hidden_1 = __importDefault(require("@material-ui/core/Hidden"));
const prop_types_1 = __importDefault(require("prop-types"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const CookieService_1 = __importDefault(require("../services/CookieService"));
const styles_1 = require("@material-ui/core/styles");
const useStyles = styles_1.makeStyles({
    card: {
        display: 'flex',
    },
    cardContent: {
        flexGrow: 1,
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
});
function viewCollection(data) {
    window.location.href = "/user/viewcollection?collectionid=" + data;
}
function editCollection(data) {
    window.location.href = "/user/editcollection?collectionid=" + data;
}
function Collections(props) {
    const classes = useStyles();
    let { collection } = props;
    const [collectionData, setCollectionData] = react_1.useState({
        collectionError: '',
    });
    function deleteCollection(collectionid, collection_name) {
        var data = deleteCollectionHelper(collectionid, collection_name, function (data) {
            if (data != null) {
                if (data.message == "Collection successfully deleted") {
                    // Display user feedback to indicate that the collection has been deleted.
                    setCollectionData(prevCollectionData => {
                        return {
                            collectionError: 'Collection successfully deleted!',
                        };
                    });
                    window.location.reload();
                }
            }
        });
    }
    function deleteCollectionHelper(id, name, callback) {
        const token = CookieService_1.default.get('access_token');
        $.ajax({
            async: false,
            url: 'http://localhost:8000/api/collections/delete_collection',
            data: {
                auth: token,
                collection_id: id,
                collection_name: name,
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
            }
        });
    }
    return (react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 6 },
        react_1.default.createElement(CardActionArea_1.default, null,
            react_1.default.createElement(Card_1.default, { className: classes.card },
                react_1.default.createElement("div", { className: classes.cardDetails },
                    react_1.default.createElement(CardContent_1.default, { className: classes.cardContent },
                        react_1.default.createElement(Typography_1.default, { component: "h2", variant: "h5" }, collection.collection_name),
                        react_1.default.createElement(Button_1.default, { size: "small", color: "primary", component: Router.Link, to: "/user/viewcollection", onClick: () => viewCollection(collection.collection_id) },
                            react_1.default.createElement(Typography_1.default, { variant: "subtitle1", color: "primary" }, "View")),
                        react_1.default.createElement(Button_1.default, { size: "small", color: "primary", component: Router.Link, to: "/user/editcollection", onClick: () => editCollection(collection.collection_id) },
                            react_1.default.createElement(Typography_1.default, { variant: "subtitle1", color: "primary" }, "Edit")),
                        react_1.default.createElement(Button_1.default, { size: "small", color: "primary", onClick: () => deleteCollection(collection.collection_id, collection.collection_name) },
                            react_1.default.createElement(Typography_1.default, { variant: "subtitle1", color: "primary" }, "Remove")))),
                react_1.default.createElement(Hidden_1.default, { xsDown: true },
                    react_1.default.createElement(CardMedia_1.default, { className: classes.cardMedia, image: 'https://source.unsplash.com/random', title: 'Image Text' }))))));
}
exports.default = Collections;
Collections.propTypes = {
    collection: prop_types_1.default.object,
};
//# sourceMappingURL=Collections.js.map