import React from 'react';
import * as Router from 'react-router-dom';

// Material UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    card: {
        display: 'flex',
    },
    cardContent: {
        flexGrow: 1,
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
                    <CardContent className={classes.cardContent}>
                        <Typography component="h2" variant="h5">
                            {collection.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {collection.date}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {collection.description}
                        </Typography>

                        {/* TODO: Dynamically change the router link to match the requested collection by collection id.*/}
                        <Button size="small" color="primary" component={Router.Link} to="/user/viewcollection/collectionid">
                            <Typography variant="subtitle1" color="primary" >
                                View
                            </Typography>
                        </Button>
                        <Button size="small" color="primary" component={Router.Link} to="/user/editcollection/collectionid">
                            <Typography variant="subtitle1" color="primary" >
                                Edit
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
