// SignUp.tsx
// Signup page

import React from "react";
import * as Router from "react-router-dom";

// Material UI
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";


const Style = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function SignUp(): JSX.Element {
    // const [signUpForm, setSignUpForm] = useState({
    //     signUpError: "",
    //     signUpFirstName: "",
    //     signUpLastName: "",
    //     signUpEmail: "",
    //     signUpPassword: ""
    // });

    function onTextboxChange() {
        console.log("onTextboxChange");
    }

    function onSignUp() {
        <Router.Redirect to="/"/>
        console.log("onSignUp");
    }

    const classes = Style();
    return(
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <div className={classes.paper}>
                <Typography component="h1" variant="h5">Sign Up</Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="signUpFirstName"
                                variant="outlined"
                                required
                                fullWidth
                                label="First Name"
                                value="{signUpForm.signUpFirstName}"
                                onChange={onTextboxChange}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="signUpLastName"
                                variant="outlined"
                                required
                                fullWidth
                                label="Last Name"
                                value="{signUpForm.signUpLastName}"
                                onChange={onTextboxChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="signUpEmail"
                                variant="outlined"
                                required
                                fullWidth
                                label="Email"
                                value="{signUpForm.signUpEmail}"
                                onChange={onTextboxChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="signUpPassword"
                                variant="outlined"
                                required
                                fullWidth
                                type="password"
                                label="Password"
                                value="{signUpForm.signUpPassword}"
                                onChange={onTextboxChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        component={ Router.Link } to="/"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onSignUp}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                              Already have an account? Sign in.
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            </Container>
        </div>
    );
}
