"use strict";
// EditCollection.tsx
// A page where users can edit a previously created collection.
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
const CookieService_1 = __importDefault(require("../services/CookieService"));
// Material UI
const Alert_1 = __importDefault(require("@material-ui/lab/Alert"));
const Add_1 = __importDefault(require("@material-ui/icons/Add"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const CardActions_1 = __importDefault(require("@material-ui/core/CardActions"));
const CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
const CardMedia_1 = __importDefault(require("@material-ui/core/CardMedia"));
const Chip_1 = __importDefault(require("@material-ui/core/Chip"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
const DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
const DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
const DialogContentText_1 = __importDefault(require("@material-ui/core/DialogContentText"));
const DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
const Edit_1 = __importDefault(require("@material-ui/icons/Edit"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const History_1 = __importDefault(require("@material-ui/icons/History"));
const ImportExport_1 = __importDefault(require("@material-ui/icons/ImportExport"));
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
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
    chip: {
        margin: theme.spacing(0.5),
    },
    chipRoot: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: theme.spacing(0.5),
        margin: 0,
    },
    root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
    },
}));
let book_list = [];
let tag_list = [];
let collection;
const EditCollection = ({}) => {
    const classes = Style();
    // For editing the collection's title.
    const [open, setOpen] = react_1.useState(false);
    const [newTitle, setNewTitle] = react_1.useState("");
    // For editing the collection's tag.
    const [tagDialog, setTagOpen] = react_1.useState(false);
    const [newTag, setNewTag] = react_1.useState("");
    // For dialog component
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleTagOpen = () => {
        setTagOpen(true);
    };
    const handleTagClose = () => {
        setTagOpen(false);
    };
    // Detects new value typed into dialog box and loads it on the screen.
    const onTitleChange = (e) => {
        const { name, value } = e.target;
        setNewTitle(value);
    };
    // Detects new value typed into dialog box and loads it on the screen.
    const onTagChange = (e) => {
        const { name, value } = e.target;
        setNewTag(value);
    };
    // Collection Data. TODO: Add more fields.
    const [collectionData, setCollectionData] = react_1.useState({
        collectionTitle: "",
        collectionTag: "",
        editCollectionError: "",
    });
    //Deletes a tag from the array of the collection's tags.
    const handleDelete = (chipToDelete) => () => {
        removeTag(chipToDelete.tag_label);
    };
    function addTag() {
        // Closes dialog box.
        handleTagClose();
        // Changes the collection title on the front-end display.
        setCollectionData((prevCollectionData) => {
            return Object.assign(Object.assign({}, prevCollectionData), { collectionTag: newTag });
        });
        var data = setCollectionTag(newTag, function (data) {
            if (data != null) {
                console.log(data.message);
                if (data.message == "Tag successfully added to collection") {
                }
                else if (data.message == "Collection already has this tag") {
                    window.location.href = "/";
                }
                else {
                    alert("Tag weird error!");
                    window.location.href = "/";
                }
            }
        });
    }
    // Retrieves collection data from the back-end/database.
    function request() {
        var data = getBooks(function (data) {
            if (data != null) {
                if (data.message == "Collection data delivered") {
                    book_list = data.book_list;
                    collection = data.collection_name;
                }
                else {
                    alert("No Matched Results!");
                    window.location.href = "/";
                }
            }
        });
    }
    function requestTags() {
        var result = getTags(function (result) {
            if (result != null) {
                if (result.message == "Got tags") {
                    let newTags = [];
                    result.tag_list.forEach(function (tag) {
                        let Tag = { key: newTags.length, tag_label: tag.tag_label };
                        newTags.push(Tag);
                    });
                    tag_list = newTags;
                }
                else if (result.message == "Collection has no tags") {
                    console.log("Do nothing, continue loading the page.");
                }
                else {
                    alert("No Matched Results!");
                    window.location.href = "/";
                }
            }
        });
    }
    function getBooks(callback) {
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/collections/view_collection",
            data: {
                collection_id: collectionId,
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
    function getTags(callback) {
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/collections/get_tags",
            data: {
                collection_id: collectionId,
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
    // Renames collection title on both front-end and back-end.
    function setCollectionTitle() {
        // Closes dialog box.
        handleClose();
        // Changes the collection title on the front-end display.
        setCollectionData((prevCollectionData) => {
            return Object.assign(Object.assign({}, prevCollectionData), { collectionTitle: newTitle });
        });
        // Change the collection title in the back-end/database.
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/collections/rename",
            data: {
                auth: token,
                collection_id: collectionId,
                collection_name: newTitle,
            },
            method: "POST",
            success: function (data) {
                if (data != null) {
                    if (data.message === "Collection successfully renamed") {
                        setCollectionData((prevCollectionData) => {
                            return Object.assign(Object.assign({}, prevCollectionData), { editCollectionError: "Collection successfully renamed!" });
                        });
                    }
                    else if (data.message === "Collection with the same name already exists") {
                        setCollectionData((prevCollectionData) => {
                            return Object.assign(Object.assign({}, prevCollectionData), { editCollectionError: "Collection with the same name already exists!" });
                        });
                    }
                }
            },
            error: function () {
                console.log("server error!");
            },
        });
    }
    // Adds collection tag on both front-end and back-end.
    function setCollectionTag(newTag, callback) {
        // Change the collection title in the back-end/database.
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/collections/add_tag",
            data: {
                collection_id: collectionId,
                tag_label: newTag,
            },
            method: "POST",
            success: function (data) {
                if (data != null) {
                    console.log(data.message);
                    callback(data);
                }
            },
            error: function () {
                console.log("server error!");
            },
        });
    }
    // Removes book from collection on both front-end and back-end.
    function removeTag(tag_label) {
        console.log("Remove tag from collection.");
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/collections/delete_tag",
            data: {
                collection_id: collectionId,
                tag_label: tag_label,
            },
            method: "POST",
            success: function (data) {
                if (data.message == "Tag successfully removed from collection") {
                    window.location.reload();
                }
                else if (data.message == "Tag not found") {
                    console.log(data.message);
                }
            },
            error: function () {
                console.log("server error!");
            },
        });
    }
    // Removes book from collection on both front-end and back-end.
    function removeBook(toRemove) {
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/collections/delete_title",
            data: {
                auth: token,
                collection_id: collectionId,
                id: toRemove,
            },
            method: "POST",
            success: function (data) {
                if (data.message == "Book removed from collection") {
                    console.log("Successfully removed book from collection!");
                    window.location.reload();
                }
            },
            error: function () {
                console.log("server error!");
            },
        });
    }
    let collectionId = window.location.href.split("?")[1];
    collectionId = collectionId.split("=")[1];
    const token = CookieService_1.default.get("access_token");
    request();
    requestTags();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement("main", null,
            react_1.default.createElement("div", { className: classes.heroContent },
                react_1.default.createElement(Container_1.default, { maxWidth: "sm" },
                    react_1.default.createElement(Grid_1.default, null,
                        react_1.default.createElement("div", null,
                            collectionData.editCollectionError === "Collection with the same name already exists!" ?
                                (react_1.default.createElement(Alert_1.default, { severity: "error" }, collectionData.editCollectionError)) : null,
                            collectionData.editCollectionError === "Collection successfully renamed!" ?
                                (react_1.default.createElement(Alert_1.default, { severity: "success" }, collectionData.editCollectionError)) : null),
                        react_1.default.createElement(Typography_1.default, { component: "h1", variant: "h2", align: "center", color: "textPrimary", gutterBottom: true },
                            collection,
                            react_1.default.createElement(Button_1.default, { variant: "outlined", color: "secondary", onClick: handleClickOpen, startIcon: react_1.default.createElement(Edit_1.default, null) }, "Rename Collection")),
                        react_1.default.createElement(Dialog_1.default, { open: open, onClose: handleClose, "aria-labelledby": "form-dialog-title" },
                            react_1.default.createElement(DialogTitle_1.default, { id: "form-dialog-title" }, "Rename Collection"),
                            react_1.default.createElement(DialogContent_1.default, null,
                                react_1.default.createElement(DialogContentText_1.default, null, "Enter a new title for your collection."),
                                react_1.default.createElement(TextField_1.default, { autoFocus: true, margin: "dense", id: "name", label: "Collection Title", type: "text", fullWidth: true, onChange: onTitleChange })),
                            react_1.default.createElement(DialogActions_1.default, null,
                                react_1.default.createElement(Button_1.default, { onClick: handleClose, color: "primary" }, "Cancel"),
                                react_1.default.createElement(Button_1.default, { onClick: setCollectionTitle, color: "primary", variant: "contained" }, "Save")))),
                    react_1.default.createElement(Paper_1.default, { component: "ul", className: classes.chipRoot }, tag_list.map((data) => {
                        return (react_1.default.createElement("li", { key: data.key },
                            react_1.default.createElement(Chip_1.default, { label: data.tag_label, onDelete: handleDelete(data), className: classes.chip })));
                    })),
                    react_1.default.createElement(Dialog_1.default, { open: tagDialog, onClose: handleTagClose, "aria-labelledby": "form-dialog-title" },
                        react_1.default.createElement(DialogTitle_1.default, { id: "form-dialog-title" }, "Add New Tag"),
                        react_1.default.createElement(DialogContent_1.default, null,
                            react_1.default.createElement(DialogContentText_1.default, null, "Enter a new tag for your collection."),
                            react_1.default.createElement(TextField_1.default, { autoFocus: true, margin: "dense", id: "name", label: "Collection Tag", type: "text", fullWidth: true, onChange: onTagChange })),
                        react_1.default.createElement(DialogActions_1.default, null,
                            react_1.default.createElement(Button_1.default, { onClick: handleTagClose, color: "primary" }, "Cancel"),
                            react_1.default.createElement(Button_1.default, { onClick: addTag, color: "primary", variant: "contained" }, "Save"))),
                    react_1.default.createElement("div", { className: classes.heroButtons },
                        react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, justify: "center" },
                            react_1.default.createElement(Grid_1.default, { item: true },
                                react_1.default.createElement(Button_1.default, { onClick: handleTagOpen, type: "submit", variant: "outlined", color: "primary", startIcon: react_1.default.createElement(Add_1.default, null) }, "Add Tags")),
                            react_1.default.createElement(Grid_1.default, { item: true },
                                react_1.default.createElement(Button_1.default, { component: Router.Link, to: "/user/addTitles?collectionid=" + collectionId, type: "submit", variant: "outlined", color: "primary", startIcon: react_1.default.createElement(Add_1.default, null) }, "Add Books")),
                            react_1.default.createElement(Grid_1.default, { item: true },
                                react_1.default.createElement(Button_1.default, { component: Router.Link, to: "/user/recent?collectionid=" + collectionId, type: "submit", variant: "outlined", color: "primary", startIcon: react_1.default.createElement(History_1.default, null) }, "Recently Added Books")),
                            react_1.default.createElement(Grid_1.default, { item: true },
                                react_1.default.createElement(Button_1.default, { type: "submit", variant: "outlined", color: "default", startIcon: react_1.default.createElement(ImportExport_1.default, null) }, "Import Books")),
                            react_1.default.createElement(Grid_1.default, { item: true },
                                react_1.default.createElement(Button_1.default, { type: "submit", variant: "outlined", color: "default", startIcon: react_1.default.createElement(ImportExport_1.default, null) }, "Export Books")))))),
            react_1.default.createElement(Container_1.default, { className: classes.cardGrid, maxWidth: "md" },
                react_1.default.createElement(Grid_1.default, { container: true, spacing: 4 }, book_list.map((book) => (react_1.default.createElement(Grid_1.default, { item: true, key: book.id, xs: 12, sm: 6, md: 4 },
                    react_1.default.createElement(Card_1.default, { className: classes.card },
                        react_1.default.createElement(CardMedia_1.default, { className: classes.cardMedia, image: "https://source.unsplash.com/random?book", title: "Image title" }),
                        react_1.default.createElement(CardContent_1.default, { className: classes.cardContent },
                            react_1.default.createElement(Typography_1.default, { gutterBottom: true, variant: "h5", component: "h2" }, book.title),
                            react_1.default.createElement(Typography_1.default, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam molestie pellentesque tortor in rhoncus.")),
                        react_1.default.createElement(CardActions_1.default, null,
                            react_1.default.createElement(Button_1.default, { component: Router.Link, to: "/bookdata/metadata?isbn=" + book.id, size: "small", color: "primary" }, "View"),
                            react_1.default.createElement(Button_1.default, { size: "small", color: "primary", component: Router.Link, to: "/" }, "Edit Status"),
                            react_1.default.createElement(Button_1.default, { size: "small", color: "primary", onClick: () => removeBook(book.id) }, "Remove")))))))))));
};
exports.default = EditCollection;
//# sourceMappingURL=EditCollection.js.map