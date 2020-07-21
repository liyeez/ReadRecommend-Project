// UserProfile.tsx
// Displays the user's reading achievements and goals.
// Displays the user's book collections.

import React, { ChangeEvent, useState, useEffect } from "react";
import * as Router from "react-router-dom";
import * as $ from "jquery";
import CookieService from "../services/CookieService";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

// Page Imports
import Collections from "./Collections";

// Material UI
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer,} from "recharts";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

let userGoals : any[] = [];
let mostRecentGoal : any; 

export default function UserProfile() {
    const [userProfileData, setUserProfileData] = useState({
        userBookCollections: [],
        collectionError: "",
    });

    // Dialog for creating a new book collection.
    const [open, setOpen] = useState(false);
    const [newTitle, setNewTitle] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Detects new value typed into dialog box and loads it on the screen.
    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                    return {
                        ...prevUserProfileData,
                        collectionError: "Collection successfully added!",
                    };
                });
            // Don't refresh the page, otherwise user feedback disappears.
            } else if (result.message == "Collection with the same name already exists") {
            // Changes the collection error message in the state which displays alert for user feedback.
                setUserProfileData((prevUserProfileData) => {
                    return {
                        ...prevUserProfileData,
                        collectionError: "Collection with the same name already exists!",
                    };
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
                    } else {
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
                } else {
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
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    let Name: string = "";
    const token = CookieService.get("access_token");
    function request() {
        var result = retrieveCollections(function (result) {
            // Updates the user's collections with the results returned.
            if (result != null) {
                userProfileData.userBookCollections = result.collection_list;
                Name = result.first_name + " " + result.last_name;
            } else {
                alert("Sth wrong!");
                window.location.href = "/";
            }
        });
    }

    request();
    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Page Heading */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h2" variant="h2" align="center" color="textPrimary">
                            Home Profile
                        </Typography>
                        <Typography component="h2" variant="h5" align="center" color="textSecondary">
                            Welcome {Name}!
                        </Typography>
                    </Container>
                </div>

                {/* User's Reading Chart and Reading Goals*/}
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                <Chart />
                            </Paper>
                        </Grid>
                        {/* Goal */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <Goal />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

                {/* User's Book Collections */}
                <Container className={classes.cardGrid} maxWidth="md">
                    <Typography component="h4" variant="h4" align="left" color="textPrimary" gutterBottom>
                        User Collections
                        <Button 
                            type="submit" variant="outlined" color="primary" startIcon={<AddIcon />}
                            onClick={handleClickOpen}
                        >
                            Create a Collection
                        </Button>
                    </Typography>

                    {/* User Feedback For Creating Collections */}
                    <div>
                        {userProfileData.collectionError === "Collection with the same name already exists!" ? 
                            (<Alert severity="error">{userProfileData.collectionError}</Alert>) : null}
                        {userProfileData.collectionError === "Collection successfully added!" ? 
                            (<Alert severity="success">{userProfileData.collectionError}</Alert>) : null}
                        {userProfileData.collectionError === "Collection successfully deleted!" ? 
                            (<Alert severity="success">{userProfileData.collectionError}</Alert>) : null}
                    </div>

                    {/* Dialog For Creating Collection */}
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Create Collection</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Enter a title for your new collection.</DialogContentText>
                            <TextField 
                                autoFocus margin="dense" id="name" label="Collection Title"
                                type="text" fullWidth onChange={onTitleChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={addCollectionTitle} color="primary" variant="contained">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Grid container direction={"row"} spacing={4} className={classes.container}>
                        {userProfileData.userBookCollections.map((collection: any) => (
                            <Collections
                                key={collection.collection_id}
                                collection={collection}
                            />
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}

const useStyles = makeStyles((theme) => ({
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
	const theme = useTheme();

	return (
		<React.Fragment>
			<ResponsiveContainer>
				<LineChart
					data={data} margin={{ top: 16, right: 16, bottom: 0, left: 24,}}
				>
				<XAxis dataKey="time" stroke={theme.palette.text.secondary} />
				<YAxis stroke={theme.palette.text.secondary}>
					<Label
						angle={270}
						position="left"
						style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
					>
						Books Read
					</Label>
				</YAxis>
				<Line
					type="monotone"
					dataKey="amount"
					stroke={theme.palette.primary.main}
					dot={false}
				/>
				</LineChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
}

function Goal() {
    const token = CookieService.get("access_token");

	// Dialog for setting a new reading goal.
	const [openGoal, setOpenGoal] = useState(false);
	const [newAmount, setNewAmount] = useState("");

	const handleClickOpenGoal = () => {
		setOpenGoal(true);
	}
  
	const handleCloseGoal = () => {
        setOpenGoal(false);
        requestNewGoal();
	}

	// Detects new value typed into dialog box and loads it on the screen.
	const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewAmount(value);
	};

	const [selectedDate, setSelectedDate] = React.useState<Date | null>(
		new Date(),
	);

	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date);
    };

    function requestUserGoals() {
        var data = getUserGoals(function (data) {
            if (data != null) {
                if (data.message === "Goals retrieved") {
                    userGoals = data.goals_list;
                }
            }
        })
    }

    function getUserGoals(callback) {
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/user/get_goals",
            data: {
                auth: token,
            },
            method: "GET",
            success: function (data) {
                if (data != null) {
                    callback(data);
                } else {
                    callback(null);
                }
            },
            error: function () {
                console.log('server error!');
                callback(null);
            }
        })
    } 
    
    function requestNewGoal() {
        // Format the requested date into string for backend query.
        let dateString = selectedDate?.toISOString().split('T')[0];
        let dateParts = dateString?.split("-");
        let formattedDateString = "";
        if (dateParts != null && dateParts.length == 3) {
            formattedDateString = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
        }

        var data = setNewGoal(formattedDateString, function (data) {
            if (data != null) {
                if (data.message === "Goal created") {
                    console.log(data);
                    console.log("gOaL cReAtEd");
                }
            }
        })
    }

    function setNewGoal(formattedDate, callback) {
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/user/set_goal",
            data: {
                auth: token,
                count_goal: parseInt(newAmount),
                date_start: formattedDate,
            },
            method: "POST",
            success: function (data) {
                if (data != null) {
                    callback(data);
                } else {
                    callback(null);
                }
            },
            error: function () {
                console.log("server error!");
                callback(null);
            }
        })
    }

    const classes = useStyles();
    requestUserGoals();
    console.log(userGoals);
    if (userGoals.length >= 1) {
        mostRecentGoal = userGoals[userGoals.length - 1];
    }

	return (
		<React.Fragment>
			<Container className={classes.container}>
				<Typography component="h4" variant="h4" color="textPrimary">
					My Goals
				</Typography>
				<Divider />
                {/*Display user's current reading goal if any.*/}
                {(typeof mostRecentGoal !== "undefined") ? 
                    (<Typography>Read {mostRecentGoal.goal} books by {mostRecentGoal.date_end} 🌱</Typography>) : 
                    (<Typography component="p">You currently don't have any reading goals.</Typography>)
                }
				
			</Container>
			{/*TODO: Implement set user reading goals. */}
			<Container className={classes.container}>
				<Link color="primary" onClick={handleClickOpenGoal}>Set Goal</Link>

                {/* Dialog For Goal Setting */}
				<Dialog open={openGoal} onClose={handleCloseGoal} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">📚 Set A New Reading Goal</DialogTitle>
                    <DialogContent>
                        <DialogContentText>How many books would you like to read?</DialogContentText>
                        <TextField autoFocus margin="dense" id="numBooks" label="# Books to Read" type="text" fullWidth onChange={onAmountChange}/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd-MM-yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Goal Start Date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{'aria-label': 'change date',}}
                            />
                        </MuiPickersUtilsProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseGoal} color="primary">
                            Cancel
                        </Button>
                        <Button color="primary" onClick={handleCloseGoal} variant="contained">
                            Add Goal
                        </Button>
                    </DialogActions>
				</Dialog>
			</Container>
		</React.Fragment>
	);
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
