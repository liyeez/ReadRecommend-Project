import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import * as Router from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Button from '@material-ui/core/Button'; 
import Container from '@material-ui/core/Container';
import Reviews from './Reviews';
import $ = require('jquery');

const useStyles = makeStyles((theme) => ({

  image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      height: 500,
      width: 250,
      justify: 'center',
      backgroundPosition: 'center',

  },
  root: {
      
      height: '100vh',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(45),
    paddingRight: theme.spacing(4),
   
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
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 350,
  },
  blockSpacing:{
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),  
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}))

function Slides(props)
{
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]
    // todo: multi slides Carousel? too mcuh work for sprint 1 ;-;
    return (
        <Carousel>
            {
                items.map( item => <Item item={item} /> )
            }
        </Carousel>
    )
}
 
function Item(props)
{
    const classes = useStyles();
    return (
        <Card className={classes.cardGrid}>
            <Typography component="p" align="center" >
              {props.item.name}
            </Typography>
            <Typography component="p" align="center" >
              {props.item.description}
            </Typography>
            <Grid container justify="center" className={classes.blockSpacing}>  
              <Button 
                component={Router.Link} 
                to="/bookdata/metadata"
                type="submit"
                variant="contained"
                color="primary">

                  Check it out!
              </Button>
            </Grid>  
        </Card>
        
    )
}


interface Props {

}


function request() {
    let book: any;
    var data = onSearch(function(data){ 
        if(data != null){
            
            book=JSON.parse(data.data)[0];
            console.log(book);

        }else{
            alert("Something Wrong!");
            window.location.href='/';
        }
        
    });
    return book;
}


function onSearch(callback) {
  let str = window.location.href.split('?')[1];
  str = str.split('=')[1];
  console.log(str);
  
  $.ajax({
      async: false,
      url:"http://localhost:8000/api/books/data",
      data: {
          isbn: str,
      },
      method: "GET",
      success: function (data) {
          console.log(data.message);
          if(data.message == 'Isbn found success') {
              
              callback(data);

          }else if(data.message == 'Isbn not found') {
              callback(null);
          }
      },
      error: function () {
          console.log("server error!");
          
      }
  });
}


const BookDetails: React.FC<Props> = ({}) => {
    
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    
    

    let book=request();
    console.log(book);
    return (
      <React.Fragment>
          <CssBaseline />
          <main>
            <Container maxWidth="xl" >
                <Grid container spacing={3} className={classes.container}>
                  {/*Book Cover*/}
                  <Grid item xs={false} md={5} lg={6} className={classes.image} /> 
                  {/*Book Metadata*/}
                  
                  <Grid item xs={12} md={6} lg={3}>
                    <Paper className={fixedHeightPaper}>
                      <Grid>
                        <Typography variant="h4" align="center" color="textPrimary" >
                          {book.fields.title}
                        </Typography>
                        <Typography component="p" align="center" >
                          By Author: {book.fields.author}
                        </Typography>
                        <Typography component="p" align="center" className={classes.blockSpacing}>
                          {book.fields.pub_date}
                        </Typography>

                        {/*TBD feature*/}
                        <Grid container justify="center">  
                            <Button component={Router.Link} 
                                to="/bookdata/metadata"
                                type="submit"
                                variant="contained"
                                color="primary"
                                >
                              Add to Library
                            </Button>    
                        </Grid> 

                      </Grid>
                    </Paper>

                {/*TBD feature*/}
                    <Grid item className={classes.heroButtons}>
                        <Button component={Router.Link} 
                            to="/auth/signup"
                            type="submit"
                            variant="contained"
                            color="primary"
                            
                            >
                          Report False Book Details
                        </Button>
                    </Grid>    
                  </Grid>
                </Grid>     
            </Container>
         

          
           <Container maxWidth="xl">
              <Grid container spacing={3} className={classes.container}>
                  {/*TBD feature*/}
                  <Grid item xs={12} md={8} lg={9}>
                      <Paper className={classes.paper}>
                        <Reviews />
                      </Paper>
                    </Grid>

                  {/*Carousel*/} {/*TBD feature*/}
                   <Grid item xs={12} md={8} lg={9}>
                     <Typography component="h4" variant="h4" align="left" color="textSecondary" gutterBottom>
                       More Books like this:
                     </Typography>
                      <Slides />     
                   </Grid>
              </Grid>  
           </Container>

        </main>          
      </React.Fragment>         
    );    

}

export default BookDetails;

// <React.Fragment>
//           <Grid container component="main" className={classes.root}>
//             <CssBaseline />
//               <Grid item xs={false} sm={4} md={7} className={classes.image} />
//                  <CarouselProvider
//                     naturalSlideWidth={100}
//                     naturalSlideHeight={125}
//                     totalSlides={3}
//                   >
//                     <Slider>
//                       <Slide index={0}>I am the first Slide.</Slide>
//                       <Slide index={1}>I am the second Slide.</Slide>
//                       <Slide index={2}>I am the third Slide.</Slide>
//                     </Slider>
//                     <ButtonBack>Back</ButtonBack>
//                     <ButtonNext>Next</ButtonNext>
//                   </CarouselProvider>
//               </Grid>    
//       </React.Fragment>   

// <CarouselProvider
//                     naturalSlideWidth={100}
//                     naturalSlideHeight={125}
//                     totalSlides={3}
//                   >
//                     <Slider>
//                       <Slide index={0}>I am the first Slide.</Slide>
//                       <Slide index={1}>I am the second Slide.</Slide>
//                       <Slide index={2}>I am the third Slide.</Slide>
//                     </Slider>
//                     <ButtonBack>Back</ButtonBack>
//                     <ButtonNext>Next</ButtonNext>
//                   </CarouselProvider>

