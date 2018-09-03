import React, { Component } from 'react';
import './App.css';

import { Provider } from 'react-redux';

import { store } from './redux/store'
import AppContainer from './components/appContainer';

// Добавляем наш селект на страницу
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </div>
    );
  }
}

export default App;
