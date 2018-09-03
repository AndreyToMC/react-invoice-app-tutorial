import * as React from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import PageLayout from './addInvoiceLayout';

import { getCustomers } from '../../redux/customers/actions'
import { getProducts } from '../../redux/products/actions'
// Интерфейс для props компонента
interface ICreateInvoicePageProps {
  products: [],
  customers: [],
  getProducts: () => void,
  getCustomers: () => void,
}

// интерфейс для state компонента
interface ICreateInvoicePageState {
  customerInput: string,
  invoiceItemsInputs: any[],
  addInput: {
    productInput: string,
    qtyInput: number,
    priceValue: number,
  },
  discountInput: number,
}

// Создание stateless component с внутреним состоянием, это позволит легко манипулировать с данными формы и валидировать их
class AddInvoicePageContainer extends React.Component<ICreateInvoicePageProps, ICreateInvoicePageState> {
  // Конструктор компонента, где state - внутренее состояние
  constructor(props) {
    super(props);
    this.state = {
      customerInput: '',
      invoiceItemsInputs: [],
      addInput: {
        productInput: '',
        qtyInput: 0,
        priceValue: 0,
      },
      discountInput: 0,
    };
  }
  componentDidMount() {
    this.props.getProducts();
    this.props.getCustomers();
  }
  // методы класса компонента
  onCustomerInputChange(e) {
    const customerId = e.target.value;
    // setState функция для изменения состояния компонента, первым агрументом идет текущее состояние, вторым идут props
    this.setState((prevState) => {
      const newState = {...prevState};
      newState.customerInput = customerId;
      return newState;
    });
  }
  onAddProductInputChange(e) {
    const productId = e.target.value;
    this.setState((prevState) => {
      const newState = {...prevState};
      const qtyValue = prevState.addInput.qtyInput;
      const productInputId = prevState.invoiceItemsInputs.length;
      newState.invoiceItemsInputs.push({ id: productInputId, product_id: productId, quantity: qtyValue });
      newState.addInput.qtyInput = 0;
      return newState;
    });
  }

  onDiscountInputChange(e) {
    if (e.target.value >= 0 && e.target.value <= 50) {
      const discountInput = e.target.value;
      this.setState({ discountInput });
    }
  }
  onItemsListProductChange(e, inputId) {
    const newProductId = e.target.value;
    this.setState((prevState) => {
      const newState = {...prevState};
      newState.invoiceItemsInputs[inputId].product_id = newProductId;
      return newState;
    });
  }
  onItemsListQuantityChange(e, inputId) {
    const newQuantity = e.target.value;
    if (newQuantity >= 0) {
      this.setState((prevState) => {
        const newState = {...prevState};
        newState.invoiceItemsInputs[inputId].quantity = newQuantity;
        return newState;
      });
    }
  }
  render() {
    const {
      invoiceItemsInputs,
    } = this.state;
    const {
      products, customers,
    } = this.props;
    return (
    <PageLayout
      products={products}
      customers={customers}
    />
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.productsList,
    customers: state.customers.customersList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getCustomers: bindActionCreators(getCustomers, dispatch),
    getProducts: bindActionCreators(getProducts, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddInvoicePageContainer);
