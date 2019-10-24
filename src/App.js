import React, { Component } from 'react';
import ProductList from './components/ProductList/ProductList';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ProductList />
      </div>
    )
  }
}


export default App;
