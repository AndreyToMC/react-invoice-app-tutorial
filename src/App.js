import React, { Component } from 'react';
import './App.css';

import MySelect from './components/addInvoicePage/selectInput'

// Добавляем наш селект на страницу
class App extends Component {
  render() {
    return (
      <div className="App">
        <MySelect />
      </div>
    );
  }
}

export default App;
