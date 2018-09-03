import * as React from 'react';

import { createStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = (theme) => createStyles({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function CustomersPage(props) {
  const { classes, customers } = props;

  return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>Customer Address</TableCell>
            <TableCell>Customer Phone number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers && customers.map((elem) => {
            return (
              <TableRow id={elem.id} key={elem.id}>
                <TableCell>{elem.name}</TableCell>
                <TableCell>{elem.address}</TableCell>
                <TableCell>{elem.phone}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
  );
}

export default withStyles(styles)(CustomersPage);
