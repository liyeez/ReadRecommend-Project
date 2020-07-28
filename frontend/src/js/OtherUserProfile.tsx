import React, {ChangeEvent, useState} from "react";
import * as Router from "react-router-dom";

// Material UI

import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from "@material-ui/core/Link";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Toolbar from '@material-ui/core/Toolbar';
import * as $ from "jquery";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
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
  container: {
      paddingTop: theme.spacing(4),
      paddingLeft: theme.spacing(16),
   
  },
  
}))

interface userForm {
    firstName: string;
    lastName: string;
}

export default function Profile() {
  const classes = useStyles();
  let cards: any;
  let str = window.location.href.split('?')[1];
  str = str.split('=')[1];
  console.log("To find: "+str);

  const [userForm, setUserForm] = useState<userForm>({
    firstName: '',
    lastName: '',
  });

  function request() {

    var data = onSearch(function(data){ 
        if(data.message == "Got user profile data") {
            cards = data.collection_list;
            userForm.firstName = data.first_name;
            userForm.lastName = data.last_name;
        }else{
            alert("No Matched Results!");
            window.location.href='/';
        }
        
    });
  }

    function onSearch(callback) {
        
        $.ajax({
            async: false,
            url: 'http://localhost:8000/api/user/get_profile',
            data: {
                user_id: str,
            },
            method: "GET",
            success: function (data) {
                if(data!= null) {
                    console.log(data);
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

    function viewCollection(data){
        window.location.href="/user/viewcollection?collectionid="+data;
    }
   
  

  request();
  return (
    <React.Fragment>
      <CssBaseline />
      
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent} >
          <Container maxWidth="md">
          <Grid container spacing={3} className={classes.container}>
           <Grid item xs={12} md={8} lg={9}>
              <Typography component="h1" variant="h2" align="left" color="textPrimary" >
                <IconButton>
                  <AccountCircleIcon display='block' style={{ fontSize: 100 }} color="inherit" />
                </IconButton>
                {userForm.firstName + " " + userForm.lastName}
              </Typography>
          </Grid>
             
          </Grid>
          </Container>

        </div>

        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.collection_name}
                    </Typography>
                    
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => viewCollection(card.collection_id)}>
                      View
                    </Button>

                    <Button size="small" color="primary">
                      Import to My Collections
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      
    </React.Fragment>
  );
}