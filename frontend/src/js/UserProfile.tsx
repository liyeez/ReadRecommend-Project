// UserProfile.tsx
// Displays the user's reading achievements and goals.
// Displays the user's book collections.

import React, {ChangeEvent, useState} from "react";
import * as Router from 'react-router-dom';
import CookieService from "../services/CookieService";

// Page Imports
import Collections from './Collections';

// Material UI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import Typography from '@material-ui/core/Typography';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

export default function UserProfile() {

  // function weird(){
  //     var data;
  //     data = onSignIn(function(result){
  //         alert("hello"+result);

  //     });
  // }


  // function onSignIn(callback) {

  //     $.ajax({
  //         async: false,
  //         url: "http://localhost:8000/api/auth/signin",
  //         method: "POST",
  //         data: {
  //             email: signInForm.signInEmail,
  //             password: signInForm.signInPassword
  //         },
  //         success: function (data) {

  //             console.log(data.status);
  //             console.log(data.message);

  //             if(data.status == 'ok') {
  //                 // Handle sign in success.
  //                 var result = data.token;
  //                 callback(result)
  //                 console.log("result:"+result);
  //                 //window.location.href = "/";
  //                 // The cookie will be available on all URLs.
  //                 const options = { path: "/" };
  //                 // Create a cookie with the token from response.
  //                 CookieService.set("access_token", data.token, options);
  //                 window.location.href="/";
  //             }
  //         },
  //         error: function (xhr, error) {
  //             flag=false;
  //             callback(error);
  //             console.log("server error!"+error);
  //             window.location.href="/auth/signin";
  //         }
  //     });

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Page Heading */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                    <Typography component="h2" variant="h2" align="center" color="textPrimary" >
                        Home Profile
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
                        My Collections
                    </Typography>

                    <Grid container direction={'row'} spacing={4}>
                        {MyCollections.map((collection) => (
                          <Collections key={collection.title} collection={collection}/>
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
        wrap: 'nowrap'
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
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

function Chart(){
    const theme = useTheme();

    return(
        <React.Fragment>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                    }}
                >
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                        angle={270}
                        position="left"
                        style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            Books Read
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

function Goal(){
    const classes = useStyles();
    return (
        <React.Fragment>
            <Container className={classes.container}>
                <Typography component="h4" variant="h4" align="center" color="textPrimary" >
                    My Goals
                </Typography>
            </Container>
            <Container className={classes.container}>
                <Typography component="p" variant="h4">
                    100 Books
                </Typography>
                <Typography color="textSecondary" className={classes.depositContext}>
                    By March 2021
                </Typography>
            </Container>
            {/*TODO: Implement set user reading goals. */}
            <Container className={classes.container}>
                <Link color="primary" href="#" >
                    Set Goal
                </Link>
            </Container>
        </React.Fragment>
    );
}

const data = [
    createData('Oct 19', 0),
    createData('Nov 19', 5),
    createData('Dec 19', 10),
    createData('Jan 20', 15),
    createData('Feb 20', 20),
    createData('Mar 20', 25),
    createData('Apr 20', 30),
    createData('May 20', 35),
    createData('Jun 20', 40),
];

const MyCollections = [
    {
        title: 'Collections 1',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
    {
        title: 'Collections 2',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
    {
        title: 'Collections 3',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
    {
        title: 'Collections 4',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
];

//<FeaturedPost book={book} />
