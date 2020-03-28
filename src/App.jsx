import React, {Component} from 'react';
import './App.css';
import PreRPCAuthorize from './components/PreRPCAuthorize.jsx';
import PreDataLoad from './components/PreDataLoad.jsx';

import { Container } from '@material-ui/core';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {state: 0, user: {}};
  }

  render() {
    const setUser = (user) => this.setState({state: 1, user: user})

    return (
      <div className="app">
        {this.state.state === 0 && (<PreRPCAuthorize setUser={setUser}/>)}
        {this.state.state === 1 && (<PreDataLoad user={this.state.user}/>)}
      </div>
    );
  }
}

export default App;
