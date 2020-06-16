import $ = require('jquery');
import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import "bootstrap";

$().ready(function () {
    $.ajax({
        url: "http://localhost:8000/api/hello_world",
        method: "GET",
        success: function (data) {
            console.log(data);
            console.log(data.name);
        },
        error: function () {
            console.log("Error!");
        }
    });
    $.ajax({
        url: "http://localhost:8000/api/hello_name_post",
        method: "POST",
        data: {
            name: "test name"
        },
        success: function (data) {
            console.log(data);
        },
        error: function () {
            console.log("Error!");
        }
    });
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Main() {
  const classes = useStyles();
  return (
    <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              <CollectionsBookmarkIcon/>
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                ReadRecommend
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                A seamless platform for book lovers to explore personalized book recommendations.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Sign up for free!
                    </Button>
                  </Grid>
                  <Grid item>
                    <Paper component="form" className={classes.root}>
                      <InputBase
                        className={classes.input}
                        placeholder="Find a Book"
                        inputProps={{ 'aria-label': 'search ReadRecommend' }}
                      />
                      <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                      </IconButton>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
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
                      image="https://source.unsplash.com/random?book"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Book Title
                      </Typography>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam molestie pellentesque tortor in rhoncus.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            ReadRecommend
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Books!
          </Typography>
          <Copyright />
        </footer>
        {/* End footer */}
      </React.Fragment>
  );
}

ReactDOM.render((
  <Main> </Main>
), document.getElementById('main'));
