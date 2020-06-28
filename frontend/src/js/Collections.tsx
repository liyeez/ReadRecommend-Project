import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

import * as Router from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

// todo in future: do ajax request from Recommend algot

export default function RecommendBook(props) {
  const classes = useStyles();
  const { collection } = props;
  
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {collection.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {collection.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {collection.description}
              </Typography>
              
              <Button size="small" color="primary" component={Router.Link} to="/user/usercollections">
                <Typography variant="subtitle1" color="primary" >
                  View Collection
                </Typography>
              </Button>

              

            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={collection.image} title={collection.imageTitle} />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

RecommendBook.propTypes = {
  collection: PropTypes.object,
};