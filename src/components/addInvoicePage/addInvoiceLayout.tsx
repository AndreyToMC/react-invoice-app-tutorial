import * as React from 'react';

import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {createStyles, WithStyles, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import NumberInput from './numberInput'
import SelectInput from './selectInput'

const styles = (theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  invoiceId: {
    textAlign: 'left',
    padding: theme.spacing.unit * 2,
  },
  centered: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface InterfacePageLayout extends WithStyles<typeof styles> {
  products: [],
}

const PageLayout = (props: InterfacePageLayout) => {
  const {
    classes, products,
  } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={8}>
                <Typography className={classes.invoiceId} variant='title' gutterBottom>
                  Invoice Id
                </Typography>
                <Grid container >
                  <Grid item xs={12} >
                    <SelectInput
                      name='customerInput'
                      placeholder='Select customer'
                      label='Customer'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    Products
                  </Grid>
                  <Grid item xs={3}>
                    Qantity
                  </Grid>
                  <Grid item xs={3}>
                    Price
                  </Grid>
                  <Grid item xs={6}>
                    <SelectInput
                      name='productInput'
                      placeholder='Add Product'
                      values={products}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <NumberInput
                      name='qtyInput'
                    />
                  </Grid>
                  <Grid item xs={3} className={classes.centered}>
                    <p>$0.00</p>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.invoiceId} variant='title' gutterBottom>
                      Total
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.invoiceId} variant='title' gutterBottom>
                      $0.00
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} className={classes.centered}>
                <div>
                  <Typography variant='subheading' gutterBottom>
                    Discount
                  </Typography>
                  <Grid item xs={12}>
                    <NumberInput name='discountInput' />
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Button variant='outlined' color='primary' className={classes.button}>
                  Send Invoice
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(PageLayout);
