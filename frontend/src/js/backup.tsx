// SignIn.tsx
// Signin page

import React, {ChangeEvent, useState} from "react";
import * as Router from "react-router-dom";
import * as $ from "jquery";
import CookieService from "../services/CookieService";

// Material UI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from "@material-ui/core/Link";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


import "react-multi-carousel/lib/styles.css";
import { makeStyles } from "@material-ui/core/styles";

const Style = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        margin: theme.spacing(3, 0, 2),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface SignInForm {
    token: string;
    signInError: string;
    signInEmail: string;
    signInPassword: string;
}

interface Props {
    // flag?: boolean;
    // {flag} : Props
}




const SignIn: React.FC<Props> = () => {
    //HI
    let flag=true;

    const [signInForm, setSignInForm] = useState<SignInForm>({
      token: '',
      signInError: '',
      signInEmail: '',
      signInPassword: ''
    });

    // Detects value typed into input and loads it on the screen
    const onTextboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignInForm(prevSignInForm => {
          return {
            ...prevSignInForm,
            [name]: value //
          };
        });
    }
 
    function preventDefault(event) {
      event.preventDefault();
      var data; 
        data = onSignIn(function(id, token){ 
            alert("hello"+token);
            setSignInForm(prevSignInForm => {
              return {
                ...prevSignInForm,
                signInEmail: token
              };
            });
        });
    }

    function onSignIn(callback) {
        
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/auth/signin",
            method: "POST",
            data: {
                email: signInForm.signInEmail,
                password: signInForm.signInPassword
            },
            success: function (data) {

                console.log(data.status);
                console.log(data.message);

                if(data.status == 'ok') {
                    // Handle sign in success.
                   
                    callback(data.user_id, data.token);
                    //window.location.href = "/";
                    // The cookie will be available on all URLs.
                    //const options = { path: "/" };
                    // Create a cookie with the token from response.
                    //CookieService.set("access_token", data.token, options);
                    //window.location.href="/";
                    //window.location.reload();
                }
            },
            error: function (xhr, error) {
                flag=false;
                callback(error);
                console.log("server error!"+error);
                //window.location.href="/auth/signin";
            }
        });
        

        // $.ajax({
        //     url: "http://localhost:8000/api/auth/signin",
        //     method: "POST",
        //     data: {
        //         email: signInForm.signInEmail,
        //         password: signInForm.signInPassword
        //     },
        //     success: function (data) {

        //         console.log(data.status);
        //         console.log(data.message);
        //         var data = data.token;
        //         if(data.status == 'ok') {
        //             const options = { path: "/" };
        //             CookieService.set("access_token", data.token, options);
                    
        //             window.location.reload();
                    
        //         }
        //     },
        //     error: function () {
        //         console.log("server error!");
        //     }  
        // });
        
    }

    



    const classes = Style();
    return (
        <div>
            <Container component="main" maxWidth="xs">
            <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h2"> Sign In</Typography>
                    <div>
                      {{flag}        
                        ? <Typography component="h1" variant="h5"> Welcome!</Typography>
                        : <Typography component="h1" variant="h5" color="secondary"> Try Again...</Typography>      
                      }
                    </div>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="signInEmail"
                            type="email"
                            label="Email"
                            value={signInForm.signInEmail}
                            onChange={onTextboxChange}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="signInPassword"
                            type="password"
                            label="Password"
                            value={signInForm.signInPassword}
                            onChange={onTextboxChange}
                        />
                        <Button
                            component={ Router.Link } to="/"
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={preventDefault}
                        >
                        Sign In
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/auth/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    )
}

export default SignIn;
