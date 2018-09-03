import * as React from 'react';

import { createStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

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
  const { classes, invoiceItems, customer, totalPrice, currentInvoice, discount } = props;

  return (
    <div className={classes.root}>
      <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant='subheading' gutterBottom>
              Invoice #{currentInvoice}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant='subheading' gutterBottom>
              {customer}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant='subheading' gutterBottom>
              Discount {discount}%
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      </Table>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceItems.length && invoiceItems.map((elem) => {
            return (
              <TableRow id={elem.id} key={elem.id}>
                <TableCell>{elem.name}</TableCell>
                <TableCell>{elem.quantity}</TableCell>
                <TableCell>${elem.price || '0.00'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant='subheading' gutterBottom>
                Total
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='subheading' gutterBottom>
                ${totalPrice}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </div>
  );
}

export default withStyles(styles)(CustomersPage);
