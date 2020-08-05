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
let userGoals = [];
let mostRecentGoal;
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
            url: API_URL + "/api/user/my_profile",
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
            url: API_URL + "/api/collections/create_collection",
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
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 4, lg: 3 },
                        react_1.default.createElement(Paper_1.default, { className: fixedHeightPaper },
                            react_1.default.createElement(Goal, null))),
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 8, lg: 9 },
                        react_1.default.createElement(Paper_1.default, { className: fixedHeightPaper },
                            react_1.default.createElement(Chart, null))))),
            react_1.default.createElement(Container_1.default, { className: classes.cardGrid, maxWidth: "lg" },
                react_1.default.createElement(Typography_1.default, { component: "h4", variant: "h4", align: "left", color: "textPrimary", gutterBottom: true },
                    "User Collections   ",
                    '    ',
                    react_1.default.createElement(Button_1.default, { type: "submit", variant: "outlined", color: "primary", startIcon: react_1.default.createElement(Add_1.default, null), onClick: handleClickOpen }, "Create")),
                react_1.default.createElement("div", null,
                    userProfileData.collectionError === "Collection with the same name already exists!" ?
                        (react_1.default.createElement(Alert_1.default, { severity: "error" }, userProfileData.collectionError)) : null,
                    userProfileData.collectionError === "Collection successfully added!" ?
                        (react_1.default.createElement(Alert_1.default, { severity: "success" }, userProfileData.collectionError)) : null,
                    userProfileData.collectionError === "Collection successfully deleted!" ?
                        (react_1.default.createElement(Alert_1.default, { severity: "success" }, userProfileData.collectionError)) : null),
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
        paddingBottom: theme.spacing(8),
    },
    createButton: {
        paddingRight: theme.spacing(8),
    },
}));
// Generate reading data for user goals graph.
function createData(goalDate, amountRead, goalToRead) {
    return { goalDate, amountRead, goalToRead };
}
function Chart() {
    const theme = styles_2.useTheme();
    const [userGoalData, setUserGoalData] = react_1.useState([]);
    // Dynamically create user goals data for graph rendering.
    userGoals.forEach(function (userGoal) {
        userGoalData.push(createData(userGoal.date_end, userGoal.books_read, userGoal.goal));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(recharts_1.ResponsiveContainer, null,
            react_1.default.createElement(recharts_1.LineChart, { data: userGoalData, margin: { top: 16, right: 16, bottom: 36, left: 24, } },
                react_1.default.createElement(recharts_1.XAxis, { dataKey: "goalDate", stroke: theme.palette.text.secondary },
                    react_1.default.createElement(recharts_1.Label, { position: "bottom", style: { textAnchor: "middle", fill: theme.palette.text.primary } }, "Goal Deadlines")),
                react_1.default.createElement(recharts_1.YAxis, { stroke: theme.palette.text.secondary },
                    react_1.default.createElement(recharts_1.Label, { angle: 270, position: "left", style: { textAnchor: "middle", fill: theme.palette.text.primary } }, "Books")),
                react_1.default.createElement(recharts_1.Tooltip, null),
                react_1.default.createElement(recharts_1.Line, { name: "Books To Read", type: "monotone", dataKey: "goalToRead", stroke: "#82ca9d" }),
                react_1.default.createElement(recharts_1.Line, { name: "Books Read", type: "monotone", dataKey: "amountRead", stroke: theme.palette.primary.main }),
                react_1.default.createElement(recharts_1.Legend, { verticalAlign: "top", align: "right" })))));
}
function Goal() {
    const token = CookieService_1.default.get("access_token");
    const [goalError, setGoalError] = react_1.useState("");
    const [goalDateError, setGoalDateError] = react_1.useState("");
    // Dialog for setting a new reading goal.
    const [openGoal, setOpenGoal] = react_1.useState(false);
    const [openEditGoal, setOpenEditGoal] = react_1.useState(false);
    const [newAmount, setNewAmount] = react_1.useState("");
    const handleClickOpenGoal = () => {
        setOpenGoal(true);
    };
    const handleCloseGoal = () => {
        setOpenGoal(false);
    };
    const handleCreateGoal = () => {
        setOpenGoal(false);
        requestNewGoal();
    };
    const handleClickEditOpenGoal = () => {
        setOpenEditGoal(true);
    };
    const handleCloseEditGoal = () => {
        setOpenEditGoal(false);
    };
    const handleDeleteGoal = () => {
        setOpenEditGoal(false);
        // Update the most recent goal to be nothing.
        mostRecentGoal = undefined;
        deleteGoal();
    };
    // Detects new value typed into dialog box and loads it on the screen.
    const onAmountChange = (e) => {
        const { name, value } = e.target;
        setNewAmount(value);
    };
    const [selectedDate, setSelectedDate] = react_1.default.useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    function requestUserGoals() {
        var data = getUserGoals(function (data) {
            if (data != null) {
                if (data.message === "Goals retrieved") {
                    userGoals = data.goals_list;
                }
            }
        });
    }
    function getUserGoals(callback) {
        $.ajax({
            async: false,
            url: API_URL + "/api/user/get_goals",
            data: {
                auth: token,
            },
            method: "GET",
            success: function (data) {
                if (data != null) {
                    callback(data);
                }
                else {
                    callback(null);
                }
            },
            error: function () {
                console.log('server error!');
                callback(null);
            }
        });
    }
    function deleteGoal() {
        $.ajax({
            async: false,
            url: API_URL + "/api/user/delete_goal",
            data: {
                auth: token,
            },
            method: "POST",
            success: function (data) {
                if (data != null) {
                    alert(data.message);
                    window.location.reload();
                }
            },
            error: function () {
                console.log('delete server error!');
            }
        });
    }
    // Format the requested date into string for backend query.
    function formatDate() {
        let dateString = selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.toISOString().split('T')[0];
        let dateParts = dateString === null || dateString === void 0 ? void 0 : dateString.split("-");
        let formattedDateString = "";
        if (dateParts != null && dateParts.length == 3) {
            formattedDateString = (parseInt(dateParts[2])) + "-" + dateParts[1] + "-" + dateParts[0];
        }
        console.log('formatted date is: ');
        return formattedDateString;
    }
    function requestNewGoal() {
        let formattedDateString = formatDate();
        console.log(formattedDateString);
        var data = setNewGoal(formattedDateString, function (data) {
            if (data != null) {
                if (data.message === "Goal created") {
                    console.log(data);
                    setGoalError("Goal successfully created!");
                }
            }
        });
    }
    function setNewGoal(formattedDate, callback) {
        console.log(formattedDate);
        $.ajax({
            async: false,
            url: API_URL + "/api/user/set_goal",
            data: {
                auth: token,
                count_goal: parseInt(newAmount),
                date_start: formattedDate,
            },
            method: "POST",
            success: function (data) {
                if (data != null) {
                    console.log(data);
                    callback(data);
                }
                else {
                    callback(null);
                }
            },
            error: function () {
                console.log("server error!");
                callback(null);
            }
        });
    }
    function requestEditGoal() {
        var data = editGoal(function (data) {
            if (data != null) {
                if (data.message === "Goal changed") {
                    setGoalError("Goal successfully saved!");
                }
                else if (data.message === "count_goal not changed") {
                    setGoalError("Goal not changed.");
                }
                else if (data.message === "invalid count_goal") {
                    setGoalError("Goal must contain at least one book, please try again.");
                }
            }
        });
    }
    function requestEditGoalDate() {
        let formattedDateString = formatDate();
        var data = editGoalDate(formattedDateString, function (data) {
            if (data != null) {
                if (data.message === "Goal dates changed") {
                    setGoalDateError("Goal successfully saved!");
                }
                else if (data.message === "invalid date") {
                    setGoalDateError("Starting date of goal cannot be in the past, please try again!");
                }
                else if (data.message == "Cannot edit past goals") {
                    setGoalDateError("The starting date of a past goal cannot be modified, please try again!");
                }
            }
        });
    }
    function editGoal(callback) {
        $.ajax({
            async: false,
            url: API_URL + "/api/user/change_count_goal",
            data: {
                auth: token,
                count_goal: parseInt(newAmount)
            },
            method: "POST",
            success: function (data) {
                if (data != null) {
                    callback(data);
                }
                else {
                    callback(null);
                }
            },
            error: function () {
                console.log("Server error!");
                callback(null);
            }
        });
    }
    function editGoalDate(formattedDateString, callback) {
        $.ajax({
            async: false,
            url: API_URL + "/api/user/change_start_date",
            data: {
                auth: token,
                date_start: formattedDateString,
            },
            method: "POST",
            success: function (data) {
                if (data != null) {
                    callback(data);
                }
                else {
                    callback(null);
                }
            },
            error: function () {
                console.log("Server error!");
                callback(null);
            }
        });
    }
    function handleEditGoal() {
        setGoalError("");
        setGoalDateError("");
        handleCloseEditGoal();
        requestEditGoal();
        requestEditGoalDate();
    }
    const classes = useStyles();
    requestUserGoals();
    if (userGoals.length >= 1) {
        mostRecentGoal = userGoals[userGoals.length - 1];
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Container_1.default, { className: classes.container },
            react_1.default.createElement(Typography_1.default, { component: "h4", variant: "h4", color: "textPrimary" }, "Reading Goal"),
            react_1.default.createElement(Divider_1.default, null),
            (typeof mostRecentGoal !== "undefined") ?
                (react_1.default.createElement("div", null,
                    react_1.default.createElement(Typography_1.default, { component: "p" },
                        "# Books To Read: ",
                        mostRecentGoal.goal),
                    react_1.default.createElement(Typography_1.default, { component: "p" },
                        "Deadline: ",
                        mostRecentGoal.date_end))) :
                (react_1.default.createElement(Typography_1.default, { component: "p" }, "You currently don't have any reading goals."))),
        react_1.default.createElement(Container_1.default, { className: classes.container },
            (userGoals.length >= 1) ? (react_1.default.createElement(Link_1.default, { onClick: handleClickEditOpenGoal }, "Edit Goal")) : (react_1.default.createElement(Link_1.default, { onClick: handleClickOpenGoal }, "Set Goal")),
            react_1.default.createElement("div", null,
                (goalError === "Goal successfully created!") ?
                    (react_1.default.createElement(Alert_1.default, { severity: "success" }, goalError)) : null,
                ((goalError === "Goal successfully saved!") && (goalDateError === "Goal successfully saved!")
                    || (goalError === "Goal not changed.") && (goalDateError === "Goal successfully saved!")) ?
                    (react_1.default.createElement(Alert_1.default, { severity: "success" }, goalDateError)) : null,
                (goalError === "Goal must contain at least one book, please try again.") ?
                    (react_1.default.createElement(Alert_1.default, { severity: "error" }, goalError)) : null,
                goalDateError === "Starting date of goal cannot be in the past, please try again!" ?
                    (react_1.default.createElement(Alert_1.default, { severity: "error" }, goalDateError)) : null,
                goalDateError === "The starting date of a past goal cannot be modified, please try again!" ?
                    (react_1.default.createElement(Alert_1.default, { severity: "error" }, goalDateError)) : null),
            react_1.default.createElement(Dialog_1.default, { open: openGoal, onClose: handleCloseGoal, "aria-labelledby": "form-dialog-title" },
                react_1.default.createElement(DialogTitle_1.default, { id: "form-dialog-title" }, "\uD83D\uDCDA Set A New Reading Goal"),
                react_1.default.createElement(DialogContent_1.default, null,
                    react_1.default.createElement(DialogContentText_1.default, null, "How many books would you like to read?"),
                    react_1.default.createElement(TextField_1.default, { autoFocus: true, margin: "dense", id: "numBooks", label: "# Books to Read", type: "number", fullWidth: true, onChange: onAmountChange }),
                    react_1.default.createElement(pickers_1.MuiPickersUtilsProvider, { utils: date_fns_1.default },
                        react_1.default.createElement(pickers_1.KeyboardDatePicker, { disableToolbar: true, variant: "inline", format: "dd-MM-yyyy", margin: "normal", id: "date-picker-inline", label: "Goal Start Date", value: selectedDate, onChange: handleDateChange, KeyboardButtonProps: { 'aria-label': 'change date', } }))),
                react_1.default.createElement(DialogActions_1.default, null,
                    react_1.default.createElement(Button_1.default, { onClick: handleCloseGoal, color: "primary" }, "Cancel"),
                    react_1.default.createElement(Button_1.default, { color: "primary", onClick: handleCreateGoal, variant: "contained" }, "Add Goal"))),
            react_1.default.createElement(Dialog_1.default, { open: openEditGoal, onClose: handleCloseEditGoal, "aria-labelledby": "form-dialog-title" },
                react_1.default.createElement(DialogTitle_1.default, null, "Edit Current Reading Goal"),
                react_1.default.createElement(DialogContent_1.default, null, (mostRecentGoal !== undefined) ?
                    (react_1.default.createElement("div", null,
                        react_1.default.createElement(Typography_1.default, { component: "p" },
                            "Books to read this period: ",
                            mostRecentGoal.goal),
                        react_1.default.createElement(Typography_1.default, { component: "p" },
                            "Current Start Date: ",
                            mostRecentGoal.date_start),
                        react_1.default.createElement(Typography_1.default, { component: "p" },
                            "Current End Date: ",
                            mostRecentGoal.date_end),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement(TextField_1.default, { id: "new-goal", label: "New Goal", type: "number", fullWidth: true, onChange: onAmountChange, InputLabelProps: { shrink: true } })),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement(pickers_1.MuiPickersUtilsProvider, { utils: date_fns_1.default },
                                react_1.default.createElement(pickers_1.KeyboardDatePicker, { disableToolbar: true, variant: "inline", format: "dd-MM-yyyy", margin: "normal", id: "date-picker-inline", label: "Edit Start Date", value: selectedDate, onChange: handleDateChange, KeyboardButtonProps: { 'aria-label': 'change date', } }))))) : (null)),
                react_1.default.createElement(DialogActions_1.default, null,
                    react_1.default.createElement(Button_1.default, { onClick: handleCloseEditGoal, color: "primary" }, "Cancel"),
                    react_1.default.createElement(Button_1.default, { onClick: handleDeleteGoal, color: "primary" }, "Delete"),
                    react_1.default.createElement(Button_1.default, { onClick: handleEditGoal, color: "primary", variant: "contained" }, "Save Changes"))))));
}
//# sourceMappingURL=UserProfile.js.map