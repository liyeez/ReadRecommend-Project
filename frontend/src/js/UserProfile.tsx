import React from 'react';
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
import FeaturedPost from './RecommendBook';
import Typography from '@material-ui/core/Typography';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    
  },
  mainGrid: {
    marginTop: theme.spacing(3),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '50vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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


const featuredPosts = [
  {
    title: 'RecommendBook 1',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'RecommendBook 2',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'RecommendBook 3',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },

];

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

function preventDefault(event) {
  event.preventDefault();
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
        <Link color="primary" href="#" onClick={preventDefault}>
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

export default function Blog() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <React.Fragment>
      <CssBaseline />
      
      <div className={classes.title}>
        <Container maxWidth="lg">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" >
            Home Profile
          </Typography>
          
         </Container>
      </div>
      
     <main className={classes.content}>
      <div className={classes.appBarSpacer} />
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
        
        <Grid container spacing={3} className={classes.container} >  
          <Typography variant="h4" align="left" paragraph>
            Book Recommendations
          </Typography>       
          <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {featuredPosts.map((book) => (
              <Grid item key={book} xs={12} sm={6} md={4}>
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

          </Grid>


      </Container>
      </main>
    </div>

    </React.Fragment>
  );
}

//<FeaturedPost book={book} />