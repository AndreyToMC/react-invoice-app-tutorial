import React, { Component } from 'react';
import './App.css';

import { Provider } from 'react-redux';

import AddInvoicePageContainer from './components/addInvoicePage/addInvoicePageContainer'
import { store } from './redux/store'

// Добавляем наш селект на страницу
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <AddInvoicePageContainer />
        </Provider>
      </div>
    );
  }
}

export default App;
