import React, {Component} from 'react';
import './App.css';
import PreRPCAuthorize from './components/PreRPCAuthorize';

import { Container } from '@material-ui/core';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {state: 0};
  }

  render() {
    return (
      <div className="app">
        {this.state.state === 0 && (<PreRPCAuthorize />)}
      </div>
    );
  }
}

export default App;
