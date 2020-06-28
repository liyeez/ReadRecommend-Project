import React, {ChangeEvent, useState} from "react";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Typography from '@material-ui/core/Typography';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Collections from './Collections';
import * as Router from 'react-router-dom';
import CookieService from "../services/CookieService";
 

  
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
        <Container maxWidth="sm">
          <div>
              <Typography component="h2" variant="h2" align="center" color="textPrimary" >
                Home Profile
              </Typography>              
          </div>
        </Container>
        
        <main>      
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

          <Container maxWidth="md">
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
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
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
          Sales ($)
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
          Reading Goals
        </Typography>
      </Container>  
      <Container className={classes.container}>
        <Typography component="p" variant="h4">
          $3,024.00
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
          on 15 March, 2019
        </Typography>
      </Container>   
      <Container className={classes.container}>
        <Link color="primary" href="#" >
          Set Goal
        </Link>
      </Container>  
    </React.Fragment>
  );
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

const MyCollections = [
  {
    title: 'Collections 1',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Collections 2',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Collections 3',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Collections 4',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Collections 5',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Collections 6',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Collections 7',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Collections 8',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Collections 9',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Collections 10',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },

];

//<FeaturedPost book={book} />