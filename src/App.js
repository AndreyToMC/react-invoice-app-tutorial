import React, { Component } from 'react';
import './App.css';

import { Provider } from 'react-redux';

import AddInvoicePage from './components/addInvoicePage/addInvoiceLayout'
import store from './redux/store'

// Добавляем наш селект на страницу
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <AddInvoicePage />
        </Provider>
      </div>
    );
  }
}

export default App;
