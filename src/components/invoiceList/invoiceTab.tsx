import * as React from 'react';

import Button from '@material-ui/core/Button/Button';
import Paper from '@material-ui/core/Paper';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = (theme) => createStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
    minWidth: 700,
  },
});

function SimpleTable(props) {
  const { classes, invoices, customersNames, toInvoice, invoicePage, toEditInvoice, toDeleteInvoice } = props;

  return (
      <Table className={classes.root}>
        <TableHead>
          <TableRow>
            <TableCell>Invoice Id</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Discount(%)</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!invoices.length && invoices.map((elem) => {
            return (
              <TableRow id={elem.id} key={elem.id}>
                <TableCell component='th' scope='row'>
                  {elem.id}
                </TableCell>
                <TableCell>{customersNames[elem.customer_id]}</TableCell>
                <TableCell>{elem.discount}%</TableCell>
                <TableCell>${elem.total}</TableCell>
                <TableCell id={elem.id}>
                  <Button id={elem.id} onClick={toInvoice} variant='outlined' className={classes.button}>
                    Viev
                  </Button>
                  {invoicePage &&
                  <Button id={elem.id} onClick={toEditInvoice} variant='outlined' color='primary' className={classes.button}>
                    Edit
                  </Button>}
                  {invoicePage &&
                  <Button id={elem.id} onClick={toDeleteInvoice} variant='outlined' color='secondary' className={classes.button}>
                    Delete
                  </Button>}
                  </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
  );
}

export default withStyles(styles)(SimpleTable);
