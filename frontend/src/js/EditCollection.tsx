// EditCollection.tsx
// A page where users can edit a previously created collection.

import React, {ChangeEvent, useState} from "react";
import * as Router from 'react-router-dom';

// Material UI
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import HistoryIcon from '@material-ui/icons/History';
import IconButton from '@material-ui/core/IconButton';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import InputBase from '@material-ui/core/InputBase';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from "@material-ui/core/styles";

const Style = makeStyles((theme) => ({
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
    chip: {
        margin: theme.spacing(0.5),
    },
    chipRoot: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

interface Props {

}

const EditCollection: React.FC<Props> = ({}) => {
    const classes = Style();

    // Collection Data. TODO: Add more fields.
    const [collectionData, setCollectionData] = useState(
        {
            collectionTitle: "Collection Title",
        }
    );

    // For editing the collection's title.
    const [open, setOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Detects new value typed into dialog box and loads it on the screen.
    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewTitle(value);
    }

    function setCollectionTitle() {
        // Closes dialog box.
        handleClose();

        // Changes the collection title on the front-end display.
        setCollectionData(prevCollectionData => {
            return {
                ...prevCollectionData,
                collectionTitle: newTitle
            };
        });

        // TODO: Change the collection title in the back-end/database.
        console.log("Change collection title in the backend.")
    }

    // Tags are represented using the Chip Material UI component.
    const [chipData, setChipData] = useState([
        { key: 0, label: 'Fiction' },
        { key: 1, label: 'Fantasy' },
        { key: 2, label: 'Action' },
        { key: 3, label: 'Thriller' },
    ]);

    // Deletes a tag from the array of the collection's tags.
    const handleDelete = (chipToDelete) => () => {
        // Deletes tag on the front-end display.
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));

        // TODO: Update the collection's tags in the back-end/database.
    };

    // TODO: Implement functionality. Gets the 10 most recently added books to the collection.
    function getRecentlyAddedBooks() {
        console.log("Get 10 most recently added books!");
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        {/*TODO: Dynamically render the collection's title */}
                        <Grid>
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                {collectionData.collectionTitle}
                                <Button variant="outlined" color="secondary" onClick={handleClickOpen} startIcon={<EditIcon />}>
                                    Rename Collection
                                </Button>
                            </Typography>

                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Rename Collection</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Enter a new title for your collection.
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Collection Title"
                                        type="text"
                                        fullWidth
                                        onChange={onTitleChange}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={setCollectionTitle} color="primary" variant="contained" >
                                        Save
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            A collection of books.
                        </Typography>
                        <Paper component="ul" className={classes.chipRoot}>
                            {chipData.map((data) => {
                                return (
                                    <li key={data.key}>
                                        <Chip
                                            label={data.label}
                                            onDelete={handleDelete(data)}
                                            className={classes.chip}
                                        />
                                    </li>
                                );
                            })}
                        </Paper>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<AddIcon />}
                                    >
                                        Add Tags
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<HistoryIcon />}
                                    >
                                        Recently Added Books
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        color="default"
                                        startIcon={<ImportExportIcon />}
                                    >
                                        Import Books
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        color="default"
                                        startIcon={<ImportExportIcon />}
                                    >
                                        Export Books
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
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
                                        <Button size="small" color="primary" component={Router.Link} to="/bookdata/metadata">
                                            View
                                        </Button>
                                        <Button size="small" color="primary" component={Router.Link} to="/bookdata/metadata">
                                            Edit Status
                                        </Button>
                                        <Button size="small" color="primary" component={Router.Link} to="/bookdata/metadata">
                                            Remove
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

export default EditCollection;
