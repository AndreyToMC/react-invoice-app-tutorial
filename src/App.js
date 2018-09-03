import React, { Component } from 'react';
import './App.css';

import { Provider } from 'react-redux';

import { store } from './redux/store'
import AppRouter from './components/appRouting';

// Добавляем наш селект на страницу
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </div>
    );
  }
}

export default App;
