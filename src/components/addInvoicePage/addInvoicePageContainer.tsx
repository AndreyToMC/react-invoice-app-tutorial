import * as React from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { sendInvoices } from '../../redux/invoices/actions';
import PageLayout from './addInvoiceLayout';

interface ICreateInvoicePageProps {
  invoiceId: number,
  productsPriceById: {},
  currentInvoice: InterfaceInvoice,
  products: [],
  customers: [],
  sendInvoices: (data: InterfaceInvoice, invoiceItemsInputs: any[]) => void,
}

interface ICreateInvoicePageState {
  errorMsg: {
    invoiceItems: string,
    customerInput: string,
    price: string,
  },
  totalPrice: string,
  customerInput: number,
  invoiceItemsInputs: InvoiceItem[],
  addInput: {
    productInput: number,
    qtyInput: number,
    priceValue: number,
  },
  discountInput: number,
}

interface InvoiceItem {
  id?: number,
  product_id?: number,
  quantity?: number,
  productPriceTotal?: string,
}
interface InterfaceInvoice {
  id?: number,
  customer_id: number,
  discount: number,
  total: string,
}

class AddInvoicePageContainer extends React.Component<ICreateInvoicePageProps, ICreateInvoicePageState> {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: {
        invoiceItems: '',
        customerInput: '',
        price: '',
      },
      totalPrice: '0.00',
      customerInput: 0,
      invoiceItemsInputs: [],
      addInput: {
        productInput: 0,
        qtyInput: 0,
        priceValue: 0,
      },
      discountInput: 0,
    };
    this.onCustomerInputChange = this.onCustomerInputChange.bind(this);
    this.onAddProductInputChange = this.onAddProductInputChange.bind(this);
    this.onAddQuantityInputChange = this.onAddQuantityInputChange.bind(this);
    this.onDiscountInputChange = this.onDiscountInputChange.bind(this);
    this.onItemsListProductChange = this.onItemsListProductChange.bind(this);
    this.onItemsListQuantityChange = this.onItemsListQuantityChange.bind(this);
    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.getProductPrice = this.getProductPrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getTotalPrice(state, discount) {
    const itemsTotalPrice = state.invoiceItemsInputs.reduce((ac, elem) => ac + parseFloat(elem.productPriceTotal), 0);
    if (discount) {
      const itemsTotalPriceWithDiscount = itemsTotalPrice - (itemsTotalPrice * discount / 100);
      return itemsTotalPriceWithDiscount.toFixed(2);
    }
    const itemTotalPriceStateDiscount = itemsTotalPrice - (itemsTotalPrice * state.discountInput / 100);
    return itemTotalPriceStateDiscount.toFixed(2);
  }

  getProductPrice(productId, qty) {
    const productPrice = this.props.productsPriceById[productId];
    return qty * productPrice;
  }

  onCustomerInputChange(e) {
    const customerId = e.target.value;
    this.setState({customerInput: customerId});
  }

  onAddProductInputChange(e) {
    const productId = e.target.value;
    this.setState((prevState) => {
      const newState = {...prevState};
      const qtyValue = prevState.addInput.qtyInput;
      const productInputId = prevState.invoiceItemsInputs.length;
      const productPriceTotal = this.getProductPrice(productId, qtyValue);
      newState.invoiceItemsInputs.push({
        id: productInputId,
        product_id: productId,
        quantity: qtyValue,
        productPriceTotal: `${productPriceTotal}`,
      });
      newState.addInput.qtyInput = 0;
      newState.totalPrice = this.getTotalPrice(newState, null);
      return newState;
    });
  }
  onAddQuantityInputChange(e) {
    const quantity = e.target.value;
    if (quantity >= 0) {
      this.setState((prevState) => {
        const newState = {...prevState};
        newState.addInput.qtyInput = quantity;
        return newState;
      });
    }
  }
  onDiscountInputChange(e) {
    if (e.target.value >= 0 && e.target.value <= 50) {
      const discountInput = e.target.value;
      const totalPrice = (this.getTotalPrice(this.state, discountInput));
      this.setState({ discountInput, totalPrice });
    }
  }
  onItemsListProductChange(e) {
    const inputId = e.target.name;
    const newProductId = e.target.value;
    this.setState((prevState) => {
      const newState = {...prevState};
      const quantity = newState.invoiceItemsInputs[inputId].quantity;
      const productPrice = this.getProductPrice(newProductId, quantity);
      newState.invoiceItemsInputs[inputId].product_id = newProductId;
      newState.invoiceItemsInputs[inputId].productPriceTotal = productPrice.toFixed(2);
      newState.totalPrice = this.getTotalPrice(newState, null);
      return newState;
    });
  }
  onItemsListQuantityChange(e) {
    const inputId = e.target.name;
    const newQuantity = e.target.value;
    if (newQuantity >= 0) {
      this.setState((prevState) => {
        const newState = {...prevState};
        const productId = newState.invoiceItemsInputs[inputId].product_id;
        const productPrice = this.getProductPrice(productId, newQuantity);
        newState.invoiceItemsInputs[inputId].quantity = newQuantity;
        newState.invoiceItemsInputs[inputId].productPriceTotal = productPrice.toFixed(2);
        newState.totalPrice = this.getTotalPrice(newState, null);
        newState.errorMsg.price = '';
        return newState;

      });
    }
  }

  onSubmit() {
    const {
      invoiceItemsInputs, discountInput, totalPrice, customerInput,
    } = this.state;
    if (invoiceItemsInputs.length < 1 || !customerInput || parseInt(totalPrice, 10) <= 0) {
      this.setState({
        errorMsg: {
          invoiceItems: '',
          customerInput: '',
          price: '',
        },
      });
      this.setState((prewState) => {
        const newState = {...prewState};
        if (!customerInput) {
          newState.errorMsg.customerInput = 'please select customer'
        }
        if (invoiceItemsInputs.length < 1) {
          newState.errorMsg.invoiceItems = 'please select products'
        }
        if (parseInt(totalPrice, 10) <= 0) {
          newState.errorMsg.price = 'please check quantity'
        }
        return newState;
      });
      return
    }
    this.props.sendInvoices({customer_id: customerInput, discount: discountInput, total: totalPrice}, invoiceItemsInputs)
  }

  render() {
    const {
      invoiceItemsInputs, customerInput, discountInput, addInput, totalPrice,
    } = this.state;
    const {
      products, customers,
    } = this.props;
    return (
    <PageLayout
      totalPrice={totalPrice}
      customerInput={customerInput}
      discountInput={discountInput}
      products={products}
      customers={customers}
      invoiceItemsInputs={invoiceItemsInputs}
      addQuantityInput={addInput.qtyInput}
      onCustomerInputChange={this.onCustomerInputChange}
      onAddProductInputChange={this.onAddProductInputChange}
      onDiscountInputChange={this.onDiscountInputChange}
      onAddQuantityInputChange={this.onAddQuantityInputChange}
      onItemsListProductChange={this.onItemsListProductChange}
      onItemsListQuantityChange={this.onItemsListQuantityChange}
      onSubmit={this.onSubmit}
    />
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.productsList,
    customers: state.customers.customersList,
    productsPriceById: state.products.productsPriceById,
    invoiceId: state.invoices.invoicesList.slice(-1).shift() && state.invoices.invoicesList.slice(-1).shift().id + 1,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    sendInvoices: bindActionCreators(sendInvoices, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddInvoicePageContainer);
