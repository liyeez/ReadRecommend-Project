"use strict";
// UserProfile.tsx
// Displays the user's reading achievements and goals.
// Displays the user's book collections.
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
const CookieService_1 = __importDefault(require("../services/CookieService"));
require("date-fns");
const date_fns_1 = __importDefault(require("@date-io/date-fns"));
// Page Imports
const Collections_1 = __importDefault(require("./Collections"));
// Material UI
const Add_1 = __importDefault(require("@material-ui/icons/Add"));
const Alert_1 = __importDefault(require("@material-ui/lab/Alert"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
const DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
const DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
const DialogContentText_1 = __importDefault(require("@material-ui/core/DialogContentText"));
const DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
const Divider_1 = __importDefault(require("@material-ui/core/Divider"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const pickers_1 = require("@material-ui/pickers");
const Link_1 = __importDefault(require("@material-ui/core/Link"));
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const recharts_1 = require("recharts");
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = require("@material-ui/core/styles");
function UserProfile() {
    const [userProfileData, setUserProfileData] = react_1.useState({
        userBookCollections: [],
        collectionError: "",
    });
    // Dialog for creating a new book collection.
    const [open, setOpen] = react_1.useState(false);
    const [newTitle, setNewTitle] = react_1.useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // Detects new value typed into dialog box and loads it on the screen.
    const onTitleChange = (e) => {
        const { name, value } = e.target;
        setNewTitle(value);
    };
    // Adds collection title on both front-end and back-end.
    function addCollectionTitle(e) {
        // Prevents React from doing stupid things.
        e.preventDefault();
        // Closes dialog box.
        handleClose();
        var result = addCollection(function (result) {
            if (result.message == "Collection successfully added") {
                // Empties any previous error messages.
                setUserProfileData((prevUserProfileData) => {
                    return Object.assign(Object.assign({}, prevUserProfileData), { collectionError: "Collection successfully added!" });
                });
                // Don't refresh the page, otherwise user feedback disappears.
            }
            else if (result.message == "Collection with the same name already exists") {
                // Changes the collection error message in the state which displays alert for user feedback.
                setUserProfileData((prevUserProfileData) => {
                    return Object.assign(Object.assign({}, prevUserProfileData), { collectionError: "Collection with the same name already exists!" });
                });
            }
        });
    }
    function retrieveCollections(callback) {
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/user/my_profile",
            method: "GET",
            data: {
                auth: token,
            },
            success: function (data) {
                if (data != null) {
                    if (data.message == "Got current user profile data") {
                        callback(data);
                    }
                    else {
                        callback(null);
                    }
                }
            },
            error: function (error) {
                callback(error);
                console.log("Server error!");
            },
        });
    }
    function addCollection(callback) {
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/collections/create_collection",
            method: "POST",
            data: {
                auth: token,
                collection_name: newTitle,
            },
            success: function (data) {
                if (data != null) {
                    callback(data);
                }
                else {
                    callback(null);
                }
            },
            error: function (error) {
                console.log("Server error!");
                callback(error);
            },
        });
    }
    const classes = useStyles();
    const fixedHeightPaper = clsx_1.default(classes.paper, classes.fixedHeight);
    let Name = "";
    const token = CookieService_1.default.get("access_token");
    function request() {
        var result = retrieveCollections(function (result) {
            // Updates the user's collections with the results returned.
            if (result != null) {
                userProfileData.userBookCollections = result.collection_list;
                Name = result.first_name + " " + result.last_name;
            }
            else {
                alert("Sth wrong!");
                window.location.href = "/";
            }
        });
    }
    request();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement("main", null,
            react_1.default.createElement("div", { className: classes.heroContent },
                react_1.default.createElement(Container_1.default, { maxWidth: "sm" },
                    react_1.default.createElement(Typography_1.default, { component: "h2", variant: "h2", align: "center", color: "textPrimary" }, "Home Profile"),
                    react_1.default.createElement(Typography_1.default, { component: "h2", variant: "h5", align: "center", color: "textSecondary" },
                        "Welcome ",
                        Name,
                        "!"))),
            react_1.default.createElement(Container_1.default, { maxWidth: "lg", className: classes.container },
                react_1.default.createElement(Grid_1.default, { container: true, spacing: 3 },
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 8, lg: 9 },
                        react_1.default.createElement(Paper_1.default, { className: fixedHeightPaper },
                            react_1.default.createElement(Chart, null))),
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 4, lg: 3 },
                        react_1.default.createElement(Paper_1.default, { className: fixedHeightPaper },
                            react_1.default.createElement(Goal, null))))),
            react_1.default.createElement(Container_1.default, { className: classes.cardGrid, maxWidth: "md" },
                react_1.default.createElement(Typography_1.default, { component: "h4", variant: "h4", align: "left", color: "textPrimary", gutterBottom: true },
                    "User Collections",
                    react_1.default.createElement(Button_1.default, { type: "submit", variant: "outlined", color: "primary", startIcon: react_1.default.createElement(Add_1.default, null), onClick: handleClickOpen }, "Create a Collection")),
                react_1.default.createElement("div", null,
                    userProfileData.collectionError ===
                        "Collection with the same name already exists!" ? (react_1.default.createElement(Alert_1.default, { severity: "error" }, userProfileData.collectionError)) : null,
                    userProfileData.collectionError ===
                        "Collection successfully added!" ? (react_1.default.createElement(Alert_1.default, { severity: "success" }, userProfileData.collectionError)) : null,
                    userProfileData.collectionError ===
                        "Collection successfully deleted!" ? (react_1.default.createElement(Alert_1.default, { severity: "success" }, userProfileData.collectionError)) : null),
                react_1.default.createElement(Dialog_1.default, { open: open, onClose: handleClose, "aria-labelledby": "form-dialog-title" },
                    react_1.default.createElement(DialogTitle_1.default, { id: "form-dialog-title" }, "Create Collection"),
                    react_1.default.createElement(DialogContent_1.default, null,
                        react_1.default.createElement(DialogContentText_1.default, null, "Enter a title for your new collection."),
                        react_1.default.createElement(TextField_1.default, { autoFocus: true, margin: "dense", id: "name", label: "Collection Title", type: "text", fullWidth: true, onChange: onTitleChange })),
                    react_1.default.createElement(DialogActions_1.default, null,
                        react_1.default.createElement(Button_1.default, { onClick: handleClose, color: "primary" }, "Cancel"),
                        react_1.default.createElement(Button_1.default, { onClick: addCollectionTitle, color: "primary", variant: "contained" }, "Save"))),
                react_1.default.createElement(Grid_1.default, { container: true, direction: "row", spacing: 4, className: classes.container }, userProfileData.userBookCollections.map((collection) => (react_1.default.createElement(Collections_1.default, { key: collection.collection_id, collection: collection }))))))));
}
exports.default = UserProfile;
const useStyles = styles_1.makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        wrap: "nowrap",
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 350,
    },
    depositContext: {
        flex: 1,
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
}));
// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}
function Chart() {
    const theme = styles_2.useTheme();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(recharts_1.ResponsiveContainer, null,
            react_1.default.createElement(recharts_1.LineChart, { data: data, margin: { top: 16, right: 16, bottom: 0, left: 24, } },
                react_1.default.createElement(recharts_1.XAxis, { dataKey: "time", stroke: theme.palette.text.secondary }),
                react_1.default.createElement(recharts_1.YAxis, { stroke: theme.palette.text.secondary },
                    react_1.default.createElement(recharts_1.Label, { angle: 270, position: "left", style: { textAnchor: "middle", fill: theme.palette.text.primary } }, "Books Read")),
                react_1.default.createElement(recharts_1.Line, { type: "monotone", dataKey: "amount", stroke: theme.palette.primary.main, dot: false })))));
}
function Goal() {
    // Dialog for setting a new reading goal.
    const [openGoal, setOpenGoal] = react_1.useState(false);
    const [newAmount, setNewAmount] = react_1.useState("");
    const handleClickOpenGoal = () => {
        setOpenGoal(true);
    };
    const handleCloseGoal = () => {
        setOpenGoal(false);
    };
    // Detects new value typed into dialog box and loads it on the screen.
    const onAmountChange = (e) => {
        const { name, value } = e.target;
        setNewAmount(value);
    };
    const [selectedDate, setSelectedDate] = react_1.default.useState(new Date('2020-07-18T21:11:54'));
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const classes = useStyles();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Container_1.default, { className: classes.container },
            react_1.default.createElement(Typography_1.default, { component: "h4", variant: "h4", color: "textPrimary" }, "My Goals"),
            react_1.default.createElement(Divider_1.default, null),
            react_1.default.createElement(Typography_1.default, { component: "p" }, "You currently don't have any reading goals.")),
        react_1.default.createElement(Container_1.default, { className: classes.container },
            react_1.default.createElement(Link_1.default, { color: "primary", onClick: handleClickOpenGoal }, "Set Goal"),
            react_1.default.createElement(Dialog_1.default, { open: openGoal, onClose: handleCloseGoal, "aria-labelledby": "form-dialog-title" },
                react_1.default.createElement(DialogTitle_1.default, { id: "form-dialog-title" }, "\uD83D\uDCDA Set A New Reading Goal"),
                react_1.default.createElement(DialogContent_1.default, null,
                    react_1.default.createElement(DialogContentText_1.default, null, "How many books would you like to read?"),
                    react_1.default.createElement(TextField_1.default, { autoFocus: true, margin: "dense", id: "name", label: "# Books to Read", type: "text", fullWidth: true, onChange: onAmountChange }),
                    react_1.default.createElement(pickers_1.MuiPickersUtilsProvider, { utils: date_fns_1.default },
                        react_1.default.createElement(pickers_1.KeyboardDatePicker, { disableToolbar: true, variant: "inline", format: "MM/dd/yyyy", margin: "normal", id: "date-picker-inline", label: "Goal Start Date", value: selectedDate, onChange: handleDateChange, KeyboardButtonProps: {
                                'aria-label': 'change date',
                            } }))),
                react_1.default.createElement(DialogActions_1.default, null,
                    react_1.default.createElement(Button_1.default, { onClick: handleCloseGoal, color: "primary" }, "Cancel"),
                    react_1.default.createElement(Button_1.default, { color: "primary", onClick: handleCloseGoal, variant: "contained" }, "Add Goal"))))));
}
const data = [
    createData("Oct 19", 0),
    createData("Nov 19", 5),
    createData("Dec 19", 10),
    createData("Jan 20", 15),
    createData("Feb 20", 20),
    createData("Mar 20", 25),
    createData("Apr 20", 30),
    createData("May 20", 35),
    createData("Jun 20", 40),
];
//<FeaturedPost book={book} />
//# sourceMappingURL=UserProfile.js.map