import * as React from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { addInvoicesItems, changeInvoicesItem,  getInvoicesItems  } from '../redux/invoiceItems/actions';
import { changeInvoice, getInvoiceById  } from '../redux/invoices/actions';
import PageLayout from './invoiceActionPage/invoiceActionPageLayout';

interface ICreateInvoicePageProps {
  match: {
    params: {
      id: number,
    },
  },
  productsPriceById: {},
  currentInvoice: InterfaceInvoice,
  products: [],
  customers: [],
  invoiceItems: [],
  getInvoiceById: (id: number) => void,
  getInvoicesItems: (id: number) => void,
  changeInvoice: (id: number, data: InterfaceInvoice) => void,
  addInvoicesItems: (id: number, data: InvoiceItem) => void,
  changeInvoicesItem: (invoiceId: number, data: InvoiceItem, priduct_id: number) => void,
}

interface ICreateInvoicePageState {
  invoiceId: number,
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

class EditInvoicePageContainer extends React.Component<ICreateInvoicePageProps, ICreateInvoicePageState> {
  constructor(props) {
    super(props);
    this.state = {
      invoiceId: 0,
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
    this.onItemsListProductChange = this.onItemsListProductChange.bind(this);
    this.onItemsListQuantityChange = this.onItemsListQuantityChange.bind(this);
    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.getProductPrice = this.getProductPrice.bind(this);
  }
  componentDidMount() {
    const invoiceId = this.props.match.params.id;
    this.props.getInvoiceById(invoiceId);
    this.props.getInvoicesItems(invoiceId);
    this.setState({ invoiceId });
  }

  getTotalPrice(products, discount) {
    const itemsTotalPrice = products.reduce((ac, elem) => ac + this.getProductPrice(elem.product_id, elem.quantity), 0);
    const itemsTotalPriceWithDiscount = itemsTotalPrice - (itemsTotalPrice * discount / 100);
    return itemsTotalPriceWithDiscount.toFixed(2);
  }

  getProductPrice(productId, qty) {
    const productPrice = this.props.productsPriceById[productId];
    return qty * productPrice;
  }

  setNewTotal = (invoiceId, item, data, newItem) => {
    let newInvoiceItemsList = [];
    if (item) {
      this.props.invoiceItems.forEach((elem: InterfaceInvoice) => {
        if (elem.id === item.id) {
          const newElem = {...item};
          newElem.product_id = data.productId;
          newElem.quantity = data.quantity;
          newInvoiceItemsList.push(newElem)
        } else {newInvoiceItemsList.push(elem)}
      })
    }

    if (newItem) {
      newInvoiceItemsList = [...this.props.invoiceItems];
      newInvoiceItemsList.push(newItem)
    }
    const totalPrice = this.getTotalPrice(newInvoiceItemsList, this.props.currentInvoice.discount);
    const newInvoice: InterfaceInvoice = {...this.props.currentInvoice};
    newInvoice.total = totalPrice;
    this.props.changeInvoice(invoiceId, newInvoice)
  };

  onCustomerInputChange(e) {
    const customerId = e.target.value;
    const newInvoice = {...this.props.currentInvoice};
    newInvoice.customer_id = customerId;
    this.props.changeInvoice(this.state.invoiceId, newInvoice);
  }

  onAddProductInputChange(e) {
    const product_id = parseInt(e.target.value, 10);
    const quantityInp = this.state.addInput.qtyInput;
    this.props.addInvoicesItems(this.state.invoiceId, {product_id, quantity: quantityInp});
    this.setNewTotal(this.state.invoiceId, null, null, {product_id, quantity: quantityInp});
    this.setState((prevState) => {
      const newState = {...prevState};
      newState.addInput.qtyInput = 0;
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

  onItemsListProductChange(e) {
    const invoiceId = this.state.invoiceId;
    const inputId = e.target.name;
    const item: InvoiceItem = this.props.invoiceItems.filter((elem: InvoiceItem) => inputId === elem.id).shift();
    const product_id = e.target.value;
    const itemQty = item.quantity;
    this.props.changeInvoicesItem(invoiceId, {product_id, quantity: itemQty}, inputId);
    this.setNewTotal(invoiceId, item, {productId: product_id, quantity: itemQty}, null);
  }

  onItemsListQuantityChange(e) {
    const invoiceId = this.state.invoiceId;
    const inputId = parseInt(e.target.name, 10);
    const item: InvoiceItem = this.props.invoiceItems.filter((elem: InvoiceItem) => inputId === elem.id).shift();
    const quantity = e.target.value;
    if (quantity < 0) {
      return
    }
    const productId = item.product_id;
    this.props.changeInvoicesItem(invoiceId, {product_id: productId, quantity}, inputId);
    this.setNewTotal(invoiceId, item, {productId, quantity}, null);
  }

  render() {
    const {
      addInput,
    } = this.state;
    const {
      products, customers, currentInvoice, invoiceItems,
    } = this.props;
    return (
      <PageLayout
        invoiceId={currentInvoice.id}
        totalPrice={currentInvoice.total}
        customerInput={currentInvoice.customer_id}
        discountInput={currentInvoice.discount}
        discountDisable={true}
        products={products}
        customers={customers}
        invoiceItemsInputs={invoiceItems}
        addQuantityInput={addInput.qtyInput}
        onCustomerInputChange={this.onCustomerInputChange}
        onAddProductInputChange={this.onAddProductInputChange}
        onAddQuantityInputChange={this.onAddQuantityInputChange}
        onItemsListProductChange={this.onItemsListProductChange}
        onItemsListQuantityChange={this.onItemsListQuantityChange}
        getProductPrice={this.getProductPrice}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    customers: state.customers.customersList,
    customersNameById: state.customers.customersNameById,
    products: state.products.productsList,
    productsPriceById: state.products.productsPriceById,
    invoiceItems: state.invoiceItems,
    currentInvoice: state.invoices.currentInvoice,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getInvoiceById: bindActionCreators(getInvoiceById, dispatch),
    getInvoicesItems: bindActionCreators(getInvoicesItems, dispatch),
    changeInvoicesItem: bindActionCreators(changeInvoicesItem, dispatch),
    addInvoicesItems: bindActionCreators(addInvoicesItems, dispatch),
    changeInvoice: bindActionCreators(changeInvoice, dispatch),

  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditInvoicePageContainer);
