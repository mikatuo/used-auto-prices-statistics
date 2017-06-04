import React, { Component } from 'react';
import logo from '../css/logo.svg';
import './Layout.css';
import Menu from './Menu.js';
import Content from './Content.js';

class MainLayout extends Component {
  render() {
    return (
      <div>
        <Menu />
        <Content />
      </div>
      /*<div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>*/
    );
  }
}

export default MainLayout;
