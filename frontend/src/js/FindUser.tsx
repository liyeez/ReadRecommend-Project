import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const styles= makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(4),
      paddingLeft: theme.spacing(16),
      paddingRight: theme.spacing(4),
   
    },
    paper: {
      align: 'center',
      width: '900px',
      margin: 'auto',
      overflow: 'hidden',
    },
    searchBar: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
     
    },
    searchInput: {
      fontSize: theme.typography.fontSize,

    },
    block: {
      display: 'block',
    },
    addUser: {
      marginRight: theme.spacing(1),
    },
    contentWrapper: {
      margin: '40px 16px',
    },
}));

interface Props{

}
// export interface ContentProps extends WithStyles<typeof styles> {}
const FindUser: React.FC<Props> = ({}) => {
   const classes = styles();

  return (
    <React.Fragment>
          <CssBaseline />
           
                <Grid container spacing={3} className={classes.container}>
                <Paper className={classes.paper}>
                  <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                    <Toolbar>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <SearchIcon className={classes.block} color="inherit" />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            placeholder="Search by email address"
                            InputProps={{
                              disableUnderline: true,
                              className: classes.searchInput,
                            }}
                          />
                        </Grid>
                        <Grid item>
                          <Button variant="contained" color="primary" className={classes.addUser}>
                            Search
                          </Button>
                          <Tooltip title="Reload">
                            <IconButton>
                              <RefreshIcon className={classes.block} color="inherit" />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </Toolbar>
                  </AppBar>
                  <div className={classes.contentWrapper}>
                    <Typography color="textSecondary" align="center">
                      No matched results
                    </Typography>
                  </div>
                </Paper>
              </Grid>
            
    </React.Fragment>

  );
}

export default FindUser;