
// import * as React from 'react';
 import CssBaseline from '@material-ui/core/CssBaseline';
// import styled from "styled-components";
 import { makeStyles } from "@material-ui/core/styles";
 import Card from '@material-ui/core/Card';
 import CardActions from '@material-ui/core/CardActions';
 import CardContent from '@material-ui/core/CardContent';
 import CardMedia from '@material-ui/core/CardMedia';
 import Grid from '@material-ui/core/Grid';
// import { CarouselProvider, ButtonNext, ButtonBack, Slide, Slider } from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css';
import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import Button from '@material-ui/core/Button'; 
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({

  image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
  },
  root: {
      display: 'center',
      height: '100vh',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    wrap: 'nowrap'
  },
}))
function Example(props)
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
        <Paper className={classes.container}>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
 
            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
        
    )
}

interface Props {

}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const BookDetails: React.FC<Props> = ({}) => {
    // This page is rendered when user clicks on 'My Collections.'
    //const [index, setIndex] = React.useState(0);
    const classes = useStyles();
    // const handleSelect = (selectedIndex, e) => {
    //     setIndex(selectedIndex);
    // };

    return (
      <React.Fragment>
          <Grid container alignItems="center" justify="center" component="main" className={classes.root}>
            <CssBaseline />
                <Container maxWidth="sm">
                   <Grid item xs={false} sm={4} md={7} className={classes.image} />
                </Container>
              
          </Grid>
          <Example/>
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

