import * as React from 'react';

import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
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
  invoiceId: number,
  products: [],
  customers: [],
  totalPrice: string,
  customerInput: number,
  invoiceItemsInputs: any[],
  discountInput: number,
  discountDisable?: boolean,
  addQuantityInput: number,
  onCustomerInputChange: (e: any) => void,
  onAddProductInputChange: (e: any) => void,
  onAddQuantityInputChange: (e: any) => void,
  onDiscountInputChange?: (e: any) => void,
  onItemsListProductChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  onItemsListQuantityChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  getProductPrice: (product_id: number, quantity: number) => void,
  onSubmit?: () => void,
  errorMsg?: {
    invoiceItems: string,
    customerInput: string,
    price: string,
  }
}

const PageLayout = (props: InterfacePageLayout) => {
  const {
    classes,
    products,
    customers,
    totalPrice,
    customerInput,
    onCustomerInputChange,
    onAddProductInputChange,
    onDiscountInputChange,
    discountInput,
    discountDisable,
    addQuantityInput,
    onAddQuantityInputChange,
    onItemsListProductChange,
    onItemsListQuantityChange,
    invoiceItemsInputs,
    onSubmit,
    invoiceId,
    getProductPrice,
    errorMsg,
  } = props;
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={8}>
              <Typography className={classes.invoiceId} variant='title' gutterBottom>
                Invoice #{invoiceId}
              </Typography>
              <Grid container >
                <Grid item xs={12} >
                  <SelectInput
                    name='customerInput'
                    placeholder='Select customer'
                    label='Customer'
                    values={customers}
                    selected={customerInput}
                    onChange={onCustomerInputChange}
                    errorMsg={!!errorMsg && errorMsg.customerInput}
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
                {invoiceItemsInputs && invoiceItemsInputs.length > 0 && invoiceItemsInputs.map((elem) => {
                  return (
                    <React.Fragment key={elem.id}>
                      <Grid item xs={6}>
                        <SelectInput
                          name={`${elem.id}`}
                          placeholder='Add Product'
                          selected={elem.product_id}
                          values={products}
                          onChange={onItemsListProductChange}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <NumberInput
                          name={`${elem.id}`}
                          value={elem.quantity}
                          onChange={onItemsListQuantityChange}
                          errorMsg={!!errorMsg && errorMsg.price}
                        />
                      </Grid>
                      <Grid item xs={3} className={classes.centered}>
                        <p>${getProductPrice(elem.product_id, elem.quantity) || '0.00'}</p>
                      </Grid>
                    </React.Fragment>
                  )
                })}
                <Grid item xs={6}>
                  <SelectInput
                    name='productInput'
                    placeholder='Add Product'
                    values={products}
                    onChange={onAddProductInputChange}
                    errorMsg={!!errorMsg && errorMsg.invoiceItems}
                  />
                </Grid>
                <Grid item xs={3}>
                  <NumberInput
                    name='qtyInput'
                    value={addQuantityInput}
                    onChange={onAddQuantityInputChange}
                    errorMsg={!!errorMsg && errorMsg.price}
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
                    ${totalPrice}
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
                  <NumberInput
                    name='discountInput'
                    onChange={onDiscountInputChange}
                    value={discountInput}
                    disabled={discountDisable}
                  />
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button variant='outlined' color='primary' className={classes.button} onClick={onSubmit}>
                Send Invoice
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(PageLayout);
