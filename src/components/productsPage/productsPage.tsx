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

function ProductsPage(props) {
  const { classes, products } = props;

  return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length && products.map((elem) => {
            return (
              <TableRow id={elem.id} key={elem.id}>
                <TableCell>{elem.name}</TableCell>
                <TableCell>${elem.price}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
  );
}

export default withStyles(styles)(ProductsPage);
