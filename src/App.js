import React, { Component } from 'react';
import './App.css';

import AddInvoicePage from './components/addInvoicePage/addInvoiceLayout'

// Добавляем наш селект на страницу
class App extends Component {
  render() {
    return (
      <div className="App">
        <AddInvoicePage />
      </div>
    );
  }
}

export default App;
