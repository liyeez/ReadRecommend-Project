import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

// Generate Order Data
function createData(id, date, name, country, comment, rating) {
  return { id, date, name, country, comment, rating };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'Very Good', 5),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'Thrilling!', 4),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'Best suspense plot!', 5),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'Dissapointing!', 1),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'Improvements needed!', 2),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Reviews() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Reviews
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell align="right">Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell>{row.comment}</TableCell>
              <TableCell align="right">{row.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          More reviews...
        </Link>
      </div>
    </React.Fragment>
  );
}