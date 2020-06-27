import React from "react";
import Carousel from "react-multi-carousel"
import CssBaseline from '@material-ui/core/CssBaseline';
import "react-multi-carousel/lib/styles.css";



export default function BookDetails() {
    // This page is rendered when user clicks on 'My Collections.'
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
    return (
      <React.Fragment>
            <CssBaseline />
              <main>
                <div>
                    <p> User collections??</p>
                </div>
                <Carousel responsive={responsive}>
                  <div>Item 1</div>
                  <div>Item 2</div>
                  <div>Item 3</div>
                  <div>Item 4</div>
                </Carousel>;
              </main> 
      </React.Fragment>         
    );    

}

